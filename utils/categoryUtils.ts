import { CategoryDef, Book } from '../types';

export const restoreSingleCategory = (categories: CategoryDef[], books: Book[]): { newCategories: CategoryDef[], newBooks: Book[] } => {
  let newBooks = [...books];
  
  const processNodes = (nodes: CategoryDef[]): CategoryDef[] => {
    return nodes.map(node => {
      if (node.name === '輕小說' || node.name === '漫畫' || node.name === '小說' || node.name === '其他') {
        let children = node.children ? processNodes(node.children) : [];
        
        const singleName = `${node.name}單行本`;
        const seriesName = `${node.name}系列`;
        
        // Handle Single Volumes
        let singleNode = children.find(c => c.name === singleName || c.name === '單行本' || c.name === '散本');
        if (singleNode) {
          singleNode.name = singleName;
          singleNode.displayName = '單行本';
          singleNode.type = 'single';
        } else {
          singleNode = {
            id: `${node.id}-single`,
            name: singleName,
            displayName: '單行本',
            type: 'single',
            children: []
          };
          children.push(singleNode);
        }

        // Handle Series
        let seriesNode = children.find(c => c.name === seriesName || c.name === '系列');
        if (seriesNode) {
            seriesNode.name = seriesName;
            seriesNode.displayName = '系列';
            seriesNode.type = 'series';
        }

        // Ensure consistency for other sub-series in the tree
        children = children.map(c => {
          if (c.type === 'series' && c.name !== seriesName && c.name !== '系列') {
            return { ...c, displayName: c.name };
          }
          return c;
        });

        // Update Books
        newBooks = newBooks.map(b => {
          // If book was in the top-level category, move to '單行本'
          if (b.category === node.name) {
            return { ...b, category: singleName };
          }
          // Handle old names for single volumes
          if (b.category === '散本' && node.name === '輕小說') {
            return { ...b, category: singleName };
          }
          if (b.category === '單行本') {
            return { ...b, category: singleName };
          }
          
          // Handle '系列' migration
          // Note: This is ambiguous if both exist, but we'll default to the current parent's seriesName
          // if we are processing that parent.
          if (b.category === '系列') {
              // We check if the book is "likely" to belong here.
              // For now, we'll just rename it to the first one we encounter (Light Novel)
              // and the user can move it if it's wrong. 
              // Better: check initialBooks for a hint.
              return { ...b, category: seriesName };
          }

          return b;
        });

        return {
          ...node,
          children
        };
      }
      return {
        ...node,
        children: node.children ? processNodes(node.children) : []
      };
    });
  };

  const newCategories = processNodes(categories);
  return { newCategories, newBooks };
};

export const migrateCategories = (nodes: CategoryDef[]): CategoryDef[] => {
  return nodes.map(node => {
    // Ensure all series categories have consistent name and displayName
    // If it's a generic series folder (ends with '系列'), default displayName to '系列'
    // Otherwise, ensure displayName equals name
    let updatedNode = { ...node };
    if (updatedNode.type === 'series') {
      const isGeneric = updatedNode.name.endsWith('系列') || updatedNode.name === '系列';
      updatedNode.displayName = isGeneric ? '系列' : updatedNode.name;
    }

    // Process children recursively first to ensure consistency throughout the tree
    if (updatedNode.children && updatedNode.children.length > 0) {
      updatedNode.children = migrateCategories(updatedNode.children);
    }

    if (updatedNode.name === '輕小說' || updatedNode.name === '漫畫' || updatedNode.name === '小說' || updatedNode.name === '其他') {
      const seriesName = `${updatedNode.name}系列`;
      
      // Check if it already has the new prefixed series folder
      const hasNewSeriesFolder = updatedNode.children.some(c => c.name === seriesName);
      if (hasNewSeriesFolder) return {
        ...updatedNode,
        children: updatedNode.children.map(c => c.name === seriesName ? { ...c, displayName: '系列' } : c)
      };

      // Check if it has the old '系列' folder and rename it
      const oldSeriesFolder = updatedNode.children.find(c => c.name === '系列');
      if (oldSeriesFolder) {
        return {
          ...updatedNode,
          children: updatedNode.children.map(c => c.name === '系列' ? { ...c, name: seriesName, displayName: '系列', type: 'series' } : c)
        };
      }

      // If neither exists, perform the full migration
      const seriesChildren = updatedNode.children.filter(c => c.name !== '散本' && c.name !== '單行本' && !c.name.endsWith('單行本'));
      const singleChildren = updatedNode.children.filter(c => c.name === '散本' || c.name === '單行本' || c.name.endsWith('單行本'));

      seriesChildren.forEach(c => c.type = 'series');
      singleChildren.forEach(c => {
          c.type = 'single';
          c.name = `${updatedNode.name}單行本`;
          c.displayName = '單行本';
      });

      return {
        ...updatedNode,
        type: 'default',
        children: [
          {
            id: `${updatedNode.id}-series`,
            name: seriesName,
            displayName: '系列',
            type: 'series',
            children: seriesChildren
          },
          ...singleChildren
        ]
      };
    }
    return updatedNode;
  });
};

/**
 * 遞歸地對分類樹進行排序。
 * 預設使用繁體中文筆劃順序 (zh-TW)，並開啟數字排序。
 */
export const sortCategoriesRecursive = (nodes: CategoryDef[]): CategoryDef[] => {
  return [...nodes]
    .sort((a, b) => {
      const nameA = a.name || '';
      const nameB = b.name || '';
      if (nameA === '其他') return 1;
      if (nameB === '其他') return -1;
      // 使用 zh-TW 進行筆劃排序
      return nameA.localeCompare(nameB, 'zh-TW', { numeric: true });
    })
    .map(node => ({
      ...node,
      children: node.children ? sortCategoriesRecursive(node.children) : []
    }));
};

export const findCategoryByName = (nodes: CategoryDef[], name: string): CategoryDef | null => {
    for (const node of nodes) {
        if (node.name === name) return node;
        if (node.children) {
            const found = findCategoryByName(node.children, name);
            if (found) return found;
        }
    }
    return null;
};

export const findCategoryById = (nodes: CategoryDef[], id: string): CategoryDef | null => {
    for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
            const found = findCategoryById(node.children, id);
            if (found) return found;
        }
    }
    return null;
};

export const findParentCategoryByName = (nodes: CategoryDef[], childName: string, currentParent: CategoryDef | null = null): CategoryDef | null => {
    for (const node of nodes) {
        if (node.name === childName) return currentParent;
        if (node.children) {
            const found = findParentCategoryByName(node.children, childName, node);
            if (found) return found;
        }
    }
    return null;
};

export const getAllDescendantNames = (node: CategoryDef): string[] => {
    let names = [node.name];
    if (node.children) {
        node.children.forEach(child => {
            names = names.concat(getAllDescendantNames(child));
        });
    }
    return names;
};