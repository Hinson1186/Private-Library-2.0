import { Book, CategoryDef } from '../types';
import { createBook, createSeries } from '../utils/bookFactory';

/**
 * 這裡是您的「永久資料庫」。
 * 此檔案由自動儲存生成。
 */

export const initialCategories: CategoryDef[] = [
  {
    "name": "輕小說",
    "type": "default",
    "children": [
      {
        "type": "series",
        "id": "24aad161-b7cd-4f9f-9dff-cad573159424-series",
        "displayName": "系列",
        "name": "輕小說系列",
        "children": [
          {
            "displayName": "刀劍神域",
            "name": "刀劍神域",
            "type": "series",
            "id": "novel-cat-sao",
            "tags": [
              "科幻",
              "戰鬥",
              "冒險"
            ],
            "children": []
          },
          {
            "tags": [
              "科幻",
              "戰鬥",
              "冒險"
            ],
            "id": "novel-cat-sao-p",
            "type": "series",
            "name": "刀劍神域 Progressive",
            "displayName": "刀劍神域 Progressive",
            "children": []
          },
          {
            "children": [],
            "name": "關於我在無意間被隔壁的天使變成廢柴這件事",
            "displayName": "關於我在無意間被隔壁的天使變成廢柴這件事",
            "id": "bf9a5344-49ec-485c-9e1d-03c3f88dbe62",
            "type": "series",
            "tags": [
              "戀愛"
            ]
          },
          {
            "children": [],
            "id": "novel-cat-season",
            "type": "series",
            "name": "春夏秋冬代行者",
            "displayName": "春夏秋冬代行者"
          },
          {
            "children": [],
            "displayName": "我想成為影之強者！",
            "name": "我想成為影之強者！",
            "type": "series",
            "id": "novel-cat-shadow",
            "tags": [
              "奇幻"
            ]
          },
          {
            "children": [],
            "displayName": "我的不起眼未婚妻在家有夠可愛",
            "name": "我的不起眼未婚妻在家有夠可愛",
            "type": "series",
            "id": "novel-cat-fiancee"
          },
          {
            "type": "series",
            "id": "novel-cat-accel",
            "tags": [
              "科幻",
              "戰鬥"
            ],
            "displayName": "加速世界",
            "name": "加速世界",
            "children": []
          },
          {
            "children": [],
            "displayName": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲",
            "name": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲",
            "type": "series",
            "id": "novel-cat-haibara"
          },
          {
            "name": "歡迎來到實力至上主義的教室",
            "displayName": "歡迎來到實力至上主義的教室",
            "id": "novel-cat-youzitsu",
            "type": "series",
            "children": []
          },
          {
            "type": "series",
            "id": "novel-cat-lord",
            "displayName": "我是星際國家的惡德領主！",
            "name": "我是星際國家的惡德領主！",
            "children": []
          },
          {
            "name": "我是星際國家的英雄騎士！",
            "displayName": "我是星際國家的英雄騎士！",
            "id": "novel-cat-knight",
            "type": "series",
            "children": []
          },
          {
            "type": "series",
            "id": "novel-cat-brave",
            "displayName": "勇者症候群",
            "name": "勇者症候群",
            "children": []
          },
          {
            "children": [],
            "name": "其實是繼妹。～總覺得剛來的繼弟很黏我～",
            "displayName": "其實是繼妹。～總覺得剛來的繼弟很黏我～",
            "id": "novel-cat-sister",
            "type": "series"
          },
          {
            "children": [],
            "name": "我當備胎女友也沒關係。",
            "displayName": "我當備胎女友也沒關係。",
            "id": "novel-cat-backup",
            "type": "series",
            "tags": [
              "戀愛"
            ]
          },
          {
            "name": "妹妹是不能當女友的，可是……",
            "displayName": "妹妹是不能當女友的，可是……",
            "id": "novel-cat-nosister",
            "type": "series",
            "children": []
          },
          {
            "name": "你以為區區轉生就逃得了嗎，哥哥？",
            "displayName": "你以為區區轉生就逃得了嗎，哥哥？",
            "id": "novel-cat-reincarnation",
            "type": "series",
            "children": []
          },
          {
            "children": [],
            "name": "沉默魔女的秘密",
            "displayName": "沉默魔女的秘密",
            "id": "silent-witch-cat-001",
            "type": "series"
          },
          {
            "type": "series",
            "id": "kings-proposal-cat-001",
            "displayName": "王者的求婚",
            "name": "王者的求婚",
            "children": []
          },
          {
            "id": "saijo-shitsuji-cat-001",
            "type": "series",
            "name": "才女的侍從",
            "displayName": "才女的侍從",
            "children": []
          },
          {
            "children": [],
            "displayName": "朋友的妹妹只纏著我",
            "name": "朋友的妹妹只纏著我",
            "type": "series",
            "id": "imo-uza-cat-001"
          },
          {
            "type": "series",
            "id": "ngnl-cat-001",
            "displayName": "遊戲人生",
            "name": "遊戲人生",
            "children": []
          },
          {
            "name": "魔女之旅",
            "displayName": "魔女之旅",
            "id": "elaina-cat-001",
            "type": "series",
            "children": [],
            "tags": [
              "冒險"
            ]
          },
          {
            "children": [],
            "name": "約會大作戰",
            "displayName": "約會大作戰",
            "id": "date-a-live-cat-001",
            "type": "series",
            "tags": [
              "奇幻",
              "戀愛"
            ]
          },
          {
            "name": "無職轉生",
            "displayName": "無職轉生",
            "id": "mushoku-cat-001",
            "type": "series",
            "children": []
          },
          {
            "type": "series",
            "id": "86-cat-001",
            "displayName": "86不存在的戰區",
            "name": "86不存在的戰區",
            "children": []
          }
        ]
      },
      {
        "displayName": "單行本",
        "name": "輕小說單行本",
        "type": "single",
        "id": "13e1e44e-d222-4cd9-bf6b-f7f91835dc54",
        "children": []
      }
    ],
    "id": "24aad161-b7cd-4f9f-9dff-cad573159424"
  },
  {
    "children": [
      {
        "id": "84ca7f1e-fa93-4f2d-a670-68dbfca56564-series",
        "type": "series",
        "name": "漫畫系列",
        "displayName": "系列",
        "children": [
          {
            "displayName": "堀與宮村",
            "name": "堀與宮村",
            "type": "series",
            "id": "manga-cat-horimiya",
            "children": []
          },
          {
            "displayName": "藍色監獄",
            "name": "藍色監獄",
            "type": "series",
            "id": "manga-cat-bluelock",
            "children": [],
            "tags": [
              "運動"
            ]
          },
          {
            "displayName": "進擊的巨人",
            "name": "進擊的巨人",
            "type": "series",
            "id": "manga-cat-aot",
            "children": []
          },
          {
            "displayName": "東京外星人",
            "name": "東京外星人",
            "type": "series",
            "id": "manga-cat-tokyoaliens",
            "children": [],
            "tags": [
              "科幻",
              "戰鬥"
            ]
          },
          {
            "displayName": "幼稚園WARS",
            "name": "幼稚園WARS",
            "type": "series",
            "id": "manga-cat-kindergartenwars",
            "children": []
          },
          {
            "displayName": "入間黑手黨",
            "name": "入間黑手黨",
            "type": "series",
            "id": "manga-cat-irumamafia",
            "children": []
          },
          {
            "displayName": "灰仭巫覡",
            "name": "灰仭巫覡",
            "type": "series",
            "id": "manga-cat-kaijinfugaku",
            "children": []
          },
          {
            "displayName": "滿州鴉片小隊",
            "name": "滿州鴉片小隊",
            "type": "series",
            "id": "manga-cat-opium",
            "children": []
          },
          {
            "children": [],
            "displayName": "笑魘",
            "name": "笑魘",
            "type": "series",
            "id": "manga-cat-smile"
          },
          {
            "displayName": "魔都精兵的奴隸",
            "name": "魔都精兵的奴隸",
            "type": "series",
            "id": "manga-cat-slave",
            "children": []
          },
          {
            "name": "光逝去的夏天",
            "displayName": "光逝去的夏天",
            "id": "manga-cat-summer",
            "type": "series",
            "children": []
          },
          {
            "displayName": "2.5次元的誘惑",
            "name": "2.5次元的誘惑",
            "type": "series",
            "id": "manga-cat-25d",
            "children": [],
            "tags": [
              "戀愛"
            ]
          },
          {
            "type": "series",
            "id": "manga-cat-abyss-m",
            "displayName": "來自深淵",
            "name": "來自深淵",
            "children": [],
            "tags": [
              "冒險"
            ]
          },
          {
            "id": "0d2176ec-22e2-4c1f-bdc7-8b0520f116a0",
            "type": "series",
            "name": "薰香花朵凛然綻放",
            "displayName": "薰香花朵凛然綻放",
            "children": [],
            "tags": [
              "戀愛",
              "校園"
            ]
          },
          {
            "children": [],
            "id": "9a3b2c1d-4e5f-6a7b-8c9d-0e1f2a3b4c5d",
            "type": "series",
            "name": "咒術迴戰",
            "displayName": "咒術迴戰",
            "tags": [
              "奇幻",
              "戰鬥"
            ]
          },
          {
            "id": "rent-a-girlfriend-id-001",
            "type": "series",
            "name": "出租女友",
            "displayName": "出租女友",
            "children": [],
            "tags": [
              "戀愛"
            ]
          },
          {
            "children": [],
            "name": "不踹不踩不成愛",
            "displayName": "不踹不踩不成愛",
            "id": "kick-love-cat-001",
            "type": "series",
            "tags": [
              "愛情"
            ]
          },
          {
            "type": "series",
            "id": "fuufu-cat-001",
            "displayName": "夫婦以上，戀人未滿",
            "name": "夫婦以上，戀人未滿",
            "children": [],
            "tags": [
              "戀愛"
            ]
          },
          {
            "children": [],
            "type": "series",
            "id": "black-cat-witch-cat-001",
            "displayName": "黑貓與魔女的教室",
            "name": "黑貓與魔女的教室",
            "tags": [
              "奇幻",
              "戰鬥",
              "校園"
            ]
          },
          {
            "type": "series",
            "id": "boys-abyss-cat-001",
            "displayName": "少年的深淵",
            "name": "少年的深淵",
            "children": [],
            "tags": [
              "黑暗",
              "人生"
            ]
          },
          {
            "children": [],
            "id": "edens-zero-cat-001",
            "type": "series",
            "name": "伊甸星原",
            "displayName": "伊甸星原",
            "tags": [
              "奇幻",
              "戰鬥"
            ]
          },
          {
            "children": [],
            "type": "series",
            "id": "amagami-cat-001",
            "displayName": "結緣甘神神社",
            "name": "結緣甘神神社"
          },
          {
            "children": [],
            "displayName": "神樂鉢",
            "name": "神樂鉢",
            "type": "series",
            "id": "kagura-cat-001"
          },
          {
            "children": [],
            "type": "series",
            "id": "midnight-heart-cat-001",
            "displayName": "午夜的傾心旋律",
            "name": "午夜的傾心旋律",
            "tags": [
              "戀愛",
              "校園"
            ]
          },
          {
            "children": [],
            "displayName": "葬送的芙莉蓮",
            "name": "葬送的芙莉蓮",
            "type": "series",
            "id": "frieren-cat-001"
          },
          {
            "children": [],
            "displayName": "おとなしそうな男子のとんでもない秘密を知ってしまった",
            "name": "おとなしそうな男子のとんでもない秘密を知ってしまった",
            "type": "series",
            "id": "c001d13c-c3e3-494a-9027-28f69922bda1"
          },
          {
            "children": [],
            "id": "1853d3d1-0f08-4a52-95c1-d07cb53644e0",
            "type": "series",
            "name": "気になってる人が男じゃなかった",
            "displayName": "気になってる人が男じゃなかった"
          },
          {
            "children": [],
            "name": "金田一少年事件簿R",
            "displayName": "金田一少年事件簿R",
            "id": "manga-cat-kindaichi",
            "type": "series",
            "tags": [
              "推理"
            ]
          },
          {
            "children": [],
            "displayName": "杜鵑婚約",
            "name": "杜鵑婚約",
            "type": "series",
            "id": "manga-cat-cuckoo",
            "tags": [
              "戀愛"
            ]
          },
          {
            "children": [],
            "name": "明日同學的水手服",
            "displayName": "明日同學的水手服",
            "id": "manga-cat-akebi",
            "type": "series",
            "tags": [
              "日常",
              "校園"
            ]
          },
          {
            "children": [],
            "displayName": "女神咖啡廳",
            "name": "女神咖啡廳",
            "type": "series",
            "id": "manga-cat-goddess",
            "tags": [
              "戀愛"
            ]
          },
          {
            "displayName": "不要欺負我，長瀞同學",
            "name": "不要欺負我，長瀞同學",
            "type": "series",
            "id": "manga-cat-nagatoro",
            "children": [],
            "tags": [
              "戀愛",
              "校園"
            ]
          },
          {
            "id": "manga-cat-kubo",
            "type": "series",
            "name": "久保同學不放過我",
            "displayName": "久保同學不放過我",
            "children": [],
            "tags": [
              "戀愛"
            ]
          },
          {
            "children": [],
            "displayName": "學姊是男孩",
            "name": "學姊是男孩",
            "type": "series",
            "id": "manga-cat-senpai-boy",
            "tags": [
              "戀愛",
              "校園"
            ]
          },
          {
            "children": [],
            "id": "manga-cat-kakegurui",
            "type": "series",
            "name": "狂賭之淵",
            "displayName": "狂賭之淵"
          },
          {
            "children": [],
            "id": "manga-cat-fairy-100",
            "type": "series",
            "name": "妖精的尾巴 百年任務",
            "displayName": "妖精的尾巴 百年任務",
            "tags": [
              "戰鬥",
              "奇幻"
            ]
          },
          {
            "displayName": "給不滅的你",
            "name": "給不滅的你",
            "type": "series",
            "id": "manga-cat-eternity",
            "children": []
          },
          {
            "children": [],
            "name": "鏈鋸人",
            "displayName": "鏈鋸人",
            "id": "manga-cat-chainsaw",
            "type": "series",
            "tags": [
              "奇幻",
              "戰鬥"
            ]
          },
          {
            "children": [],
            "type": "series",
            "id": "manga-cat-ender",
            "displayName": "終之退魔師",
            "name": "終之退魔師",
            "tags": [
              "奇幻",
              "戰鬥"
            ]
          },
          {
            "displayName": "非專業私刑",
            "name": "非專業私刑",
            "type": "series",
            "id": "manga-cat-vigilante",
            "children": []
          },
          {
            "children": [],
            "displayName": "she is beautiful",
            "name": "she is beautiful",
            "type": "series",
            "id": "manga-cat-she-beautiful"
          },
          {
            "children": [],
            "name": "香格里拉·開拓異境~糞作獵手挑戰神作~",
            "displayName": "香格里拉·開拓異境~糞作獵手挑戰神作~",
            "id": "manga-cat-shangrila",
            "type": "series",
            "tags": [
              "冒險",
              "戰鬥"
            ]
          },
          {
            "children": [],
            "id": "manga-cat-nesumi",
            "type": "series",
            "name": "小鼠的初戀",
            "displayName": "小鼠的初戀"
          },
          {
            "children": [],
            "displayName": "四月是你的謊言 新裝版",
            "name": "四月是你的謊言 新裝版",
            "type": "series",
            "id": "manga-cat-shigatsu-shinsou"
          },
          {
            "children": [],
            "displayName": "五等分的新娘",
            "name": "五等分的新娘",
            "type": "series",
            "id": "manga-cat-gotoubun"
          },
          {
            "children": [],
            "displayName": "RUBY",
            "name": "RUBY",
            "type": "series",
            "id": "manga-cat-ruby"
          },
          {
            "children": [],
            "displayName": "犬與屑",
            "name": "犬與屑",
            "type": "series",
            "id": "manga-cat-inutokuzu",
            "tags": [
              "愛情"
            ]
          },
          {
            "children": [],
            "displayName": "All You Need Is Kill",
            "name": "All You Need Is Kill",
            "type": "series",
            "id": "manga-cat-allyouneed"
          },
          {
            "children": [],
            "displayName": "西沢5短篇集",
            "name": "西沢5短篇集",
            "type": "series",
            "id": "manga-cat-nishizawa5"
          },
          {
            "children": [],
            "displayName": "地獄樂",
            "name": "地獄樂",
            "type": "series",
            "id": "manga-cat-jigokuraku",
            "tags": [
              "戰鬥",
              "奇幻"
            ]
          },
          {
            "children": [],
            "displayName": "無實之花",
            "name": "無實之花",
            "type": "series",
            "id": "manga-cat-mujitsunohana"
          },
          {
            "children": [],
            "displayName": "歸來的愛麗絲",
            "name": "歸來的愛麗絲",
            "type": "series",
            "id": "manga-cat-alice"
          },
          {
            "children": [],
            "displayName": "夏日時光",
            "name": "夏日時光",
            "type": "series",
            "id": "manga-cat-summertime",
            "tags": [
              "奇幻",
              "懸疑"
            ]
          },
          {
            "children": [],
            "displayName": "章魚嗶的原罪",
            "name": "章魚嗶的原罪",
            "type": "series",
            "id": "manga-cat-takopi"
          },
          {
            "children": [],
            "displayName": "少女終末旅行",
            "name": "少女終末旅行",
            "type": "series",
            "id": "manga-cat-girls-last-tour"
          },
          {
            "children": [],
            "displayName": "我推的孩子",
            "name": "我推的孩子",
            "type": "series",
            "id": "manga-cat-oshinoko",
            "tags": [
              "權謀",
              "戀愛"
            ]
          }
        ]
      },
      {
        "children": [],
        "name": "漫畫單行本",
        "displayName": "單行本",
        "id": "84ca7f1e-fa93-4f2d-a670-68dbfca56564-single",
        "type": "single"
      }
    ],
    "id": "84ca7f1e-fa93-4f2d-a670-68dbfca56564",
    "type": "default",
    "name": "漫畫"
  },
  {
    "name": "小說",
    "id": "novel-main",
    "children": [
      {
        "displayName": "系列",
        "name": "小說系列",
        "type": "series",
        "id": "novel-series",
        "children": [
          {
            "children": [],
            "name": "龍之國幻想",
            "displayName": "龍之國幻想",
            "id": "dragon-country-series",
            "type": "series"
          },
          {
            "children": [],
            "id": "strange-peaks-series",
            "type": "series",
            "name": "奇峰異石傳",
            "displayName": "奇峰異石傳"
          },
          {
            "children": [],
            "id": "kings-game-series",
            "type": "series",
            "name": "國王遊戲",
            "displayName": "國王遊戲"
          }
        ]
      },
      {
        "displayName": "單行本",
        "name": "小說單行本",
        "type": "single",
        "id": "novel-single",
        "children": []
      }
    ]
  },
  {
    "name": "畫集",
    "displayName": "畫集",
    "id": "cat-artbook-main",
    "type": "default",
    "tags": [],
    "children": [
      {
        "type": "series",
        "id": "artbook-series-container",
        "displayName": "系列",
        "name": "畫集系列",
        "children": [
          {
            "displayName": "ELDEN RING OFFICIAL ART BOOK",
            "name": "ELDEN RING OFFICIAL ART BOOK",
            "type": "series",
            "id": "artbook-cat-elden-ring",
            "children": []
          },
          {
            "displayName": "原神插畫集",
            "name": "原神插畫集",
            "type": "series",
            "id": "artbook-cat-genshin",
            "children": []
          }
        ]
      },
      {
        "displayName": "單行本",
        "name": "畫集單行本",
        "type": "single",
        "id": "artbook-single",
        "children": []
      }
    ]
  },
  {
    "name": "其他",
    "id": "other-main",
    "children": [
      {
        "name": "其他系列",
        "displayName": "系列",
        "id": "other-series",
        "type": "series",
        "children": []
      },
      {
        "displayName": "單行本",
        "name": "其他單行本",
        "type": "single",
        "id": "other-single",
        "children": []
      }
    ]
  }
];

export const initialBooks: Book[] = [
  {
    "id": "artbook-sao-abec-wanderers",
    "title": "Sword Art Online刀劍神域 abec畫集 Wanderers",
    "author": "abec / 川原礫",
    "category": "畫集單行本",
    "type": "single",
    "relatedIp": "刀劍神域",
    "originDomain": "light_novel",
    "volume": 1,
    "tags": [],
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66401e9aa77ba60019126932/800x.webp?source_format=jpg"
  },
  {
    "id": "artbook-deemo-2",
    "title": "DEEMO II: 美術設定集",
    "author": "雷亞遊戲 (Rayark Inc.)",
    "category": "畫集單行本",
    "type": "single",
    "originDomain": "game",
    "volume": 1,
    "tags": [],
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x768/smart/filters:sharpen(sigma):format(webp)/s.eslite.com/upload/product/o/2682204925006/20220715041710345700.jpg"
  },
  {
    "id": "artbook-roshidere-momoko",
    "title": "不時輕聲地以俄語遮羞的鄰座艾莉同學 ももこ畫集",
    "author": "ももこ / 燦々SUN",
    "category": "畫集單行本",
    "type": "single",
    "originDomain": "light_novel",
    "volume": 1,
    "tags": [],
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66f114fb54f41f0011ca7b3b/800x.webp?source_format=jpg"
  },
  {
    "id": "artbook-oshinoko-glare-sparkle",
    "title": "【我推的孩子】1st插畫集 Glare×Sparkle",
    "author": "橫槍萌果 / 赤坂明",
    "category": "畫集單行本",
    "type": "single",
    "relatedIp": "我推的孩子",
    "originDomain": "manga",
    "volume": 1,
    "tags": [],
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x768/filters:format(webp)/s.eslite.com/b2b/newItem/ebook_init/main1_453023.jpg"
  },
  {
    "id": "artbook-epiao-artbook",
    "title": "《餓殍：明末千里行》藝術設定集",
    "author": "零創遊戲 (ZeroCreStudio) / 嵇零",
    "category": "畫集單行本",
    "type": "single",
    "relatedIp": "餓殍：明末千里行",
    "originDomain": "game",
    "volume": 1,
    "tags": [],
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/CN1/321/18/CN13211841.jpg&v=69a1040ek&w=348&h=348"
  },
  {
    "id": "artbook-elden-ring-1",
    "title": "ELDEN RING OFFICIAL ART BOOK Volume I",
    "author": "フロム・ソフトウェア (FromSoftware)",
    "category": "ELDEN RING OFFICIAL ART BOOK",
    "type": "series",
    "originDomain": "game",
    "volume": 1,
    "seriesGroup": "ELDEN RING OFFICIAL ART BOOK",
    "tags": [],
    "coverUrl": "https://cdn.kdkw.jp/cover_1000/322201/322201000408.webp"
  },
  {
    "coverUrl": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/092/46/0010924694_b_02.jpg&v=62886b7ck&w=348&h=348",
    "author": "阿卡蒂．馬婷",
    "type": "single",
    "tags": [],
    "category": "小說單行本",
    "title": "名為和平的荒蕪",
    "subCategory": "",
    "genre": "",
    "id": "13b4107c-df1d-4365-869a-764921e21b9a"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NJ0039/NJ0039001/NJ0039001.jpg",
    "author": "八目迷",
    "type": "single",
    "category": "輕小說單行本",
    "tags": [],
    "subCategory": "",
    "title": "通往夏天的隧道，再見的出口",
    "genre": "",
    "id": "9ae9b3ba-2f5b-4ca3-9b0c-d2671040ab05"
  },
  {
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2680855454005/317898.jpg",
    "author": "西尾維新",
    "type": "single",
    "category": "輕小說單行本",
    "tags": [],
    "subCategory": "",
    "title": "少女不十分",
    "genre": "",
    "id": "shoujo-fushubun"
  },
  {
    "author": "曉佳奈",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NB0028/NB0028001A/NB0028001A.jpg",
    "type": "single",
    "category": "春夏秋冬代行者",
    "tags": [],
    "genre": "",
    "subCategory": "",
    "title": "春夏秋冬代行者 春之舞 上",
    "id": "season-spring-1"
  },
  {
    "author": "曉佳奈",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NB0028/NB0028002A/NB0028002A.jpg",
    "category": "春夏秋冬代行者",
    "tags": [],
    "type": "single",
    "genre": "",
    "subCategory": "",
    "title": "春夏秋冬代行者 春之舞 下",
    "id": "season-spring-2"
  },
  {
    "title": "春夏秋冬代行者 曉之射手",
    "subCategory": "",
    "genre": "",
    "id": "season-archer",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NB0033/NB0033001A/NB0033001A.jpg",
    "author": "曉佳奈",
    "type": "single",
    "category": "春夏秋冬代行者",
    "tags": []
  },
  {
    "type": "single",
    "category": "春夏秋冬代行者",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NB0030/NB0030001A/NB0030001A.jpg",
    "author": "曉佳奈",
    "id": "season-summer-1",
    "title": "春夏秋冬代行者 夏之舞 上",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "season-summer-2",
    "title": "春夏秋冬代行者 夏之舞 下",
    "subCategory": "",
    "genre": "",
    "category": "春夏秋冬代行者",
    "tags": [],
    "type": "single",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NB0030/NB0030002A/NB0030002A.jpg",
    "author": "曉佳奈"
  },
  {
    "id": "d1fea1dc-7805-4920-ac47-5a2a33f7b410",
    "genre": "",
    "subCategory": "",
    "title": "おとなしそうな男子のとんでもない秘密を知ってしまった 2",
    "category": "おとなしそうな男子のとんでもない秘密を知ってしまった",
    "tags": [],
    "type": "single",
    "author": "カシバ",
    "coverUrl": "https://m.media-amazon.com/images/I/81U5rVy1bxL._SY425_.jpg"
  },
  {
    "id": "eminence-shadow-2",
    "subCategory": "",
    "title": "我想成為影之強者！ 2",
    "genre": "",
    "category": "我想成為影之強者！",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66582136894038001fb246ca/800x.webp?source_format=jpg",
    "author": "逢澤大介"
  },
  {
    "id": "jimokawa-4",
    "genre": "",
    "title": "我的不起眼未婚妻在家有夠可愛 4",
    "subCategory": "",
    "tags": [],
    "category": "我的不起眼未婚妻在家有夠可愛",
    "type": "single",
    "author": "三河ごーすと",
    "coverUrl": ""
  },
  {
    "subCategory": "",
    "title": "非專業私刑 1",
    "genre": "",
    "id": "vigilante-1",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/68fb4a68d0d50e0010860ab1/800x.webp?source_format=jpg",
    "author": "内藤光太郎/浅村壮平",
    "category": "非專業私刑",
    "tags": [],
    "type": "single"
  },
  {
    "subCategory": "",
    "title": "she is beautiful 1",
    "genre": "",
    "id": "she-beautiful-1",
    "coverUrl": "",
    "author": "江坂純/凸ノ高秀",
    "tags": [],
    "category": "she is beautiful",
    "type": "single"
  },
  {
    "type": "single",
    "category": "香格里拉·開拓異境~糞作獵手挑戰神作~",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1667/KD1667001/KD1667001.jpg",
    "author": "硬梨菜/不二涼介",
    "id": "shangrila-1",
    "title": "香格里拉·開拓異境~糞作獵手挑戰神作~ 1",
    "subCategory": "",
    "genre": ""
  },
  {
    "category": "刀劍神域",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662aa3c1c57db000d7badc1/800x.webp?source_format=jpg",
    "author": "川原礫",
    "id": "sao-1",
    "subCategory": "",
    "title": "刀劍神域 1",
    "genre": ""
  },
  {
    "id": "sao-2",
    "subCategory": "",
    "title": "刀劍神域 2",
    "genre": "",
    "type": "series",
    "category": "刀劍神域",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a9b48179f8001692ec98/800x.webp?source_format=jpg",
    "author": "川原礫"
  },
  {
    "type": "series",
    "category": "刀劍神域",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a9704ecb10001c3b6fe1/800x.webp?source_format=jpg",
    "author": "川原礫",
    "id": "sao-3",
    "subCategory": "",
    "title": "刀劍神域 3",
    "genre": ""
  },
  {
    "genre": "",
    "title": "刀劍神域 4",
    "subCategory": "",
    "id": "sao-4",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a92c1c57db00137babe5/800x.webp?source_format=jpg",
    "type": "series",
    "category": "刀劍神域"
  },
  {
    "category": "刀劍神域",
    "type": "series",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a8fe9df6f5000d859e2f/800x.webp?source_format=jpg",
    "id": "sao-5",
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 5"
  },
  {
    "title": "刀劍神域 6",
    "subCategory": "",
    "genre": "",
    "id": "sao-6",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a8da9ec117ad4f76597e/800x.webp?source_format=jpg",
    "author": "川原礫",
    "type": "series",
    "category": "刀劍神域"
  },
  {
    "category": "刀劍神域",
    "type": "series",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a8974ecb1000163b6fb1/800x.webp?source_format=jpg",
    "id": "sao-7",
    "genre": "",
    "title": "刀劍神域 7",
    "subCategory": ""
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 8",
    "id": "sao-8",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a848d39a4c001f5976f6/800x.webp?source_format=jpg",
    "type": "series",
    "category": "刀劍神域"
  },
  {
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a7f455dc2cc12808c1f8/800x.webp?source_format=jpg",
    "category": "刀劍神域",
    "type": "series",
    "genre": "",
    "title": "刀劍神域 9",
    "subCategory": "",
    "id": "sao-9"
  },
  {
    "subCategory": "",
    "title": "刀劍神域 10",
    "genre": "",
    "id": "sao-10",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a7a8b496b4001988473b/800x.webp?source_format=jpg",
    "author": "川原礫",
    "type": "series",
    "category": "刀劍神域"
  },
  {
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a780aac2c80013184e43/800x.webp?source_format=jpg",
    "category": "刀劍神域",
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 11",
    "id": "sao-11"
  },
  {
    "id": "sao-12",
    "genre": "",
    "title": "刀劍神域 12",
    "subCategory": "",
    "type": "series",
    "category": "刀劍神域",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a74d8ab5d400131c591f/800x.webp?source_format=jpg"
  },
  {
    "id": "sao-13",
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 13",
    "category": "刀劍神域",
    "type": "series",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a70b7f2055b985a3a97c/800x.webp?source_format=jpg"
  },
  {
    "category": "刀劍神域",
    "type": "series",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a6d094d4ac001f0eab6c/800x.webp?source_format=jpg",
    "id": "sao-14",
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 14"
  },
  {
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a69e5044a9000da1ed71/800x.webp?source_format=jpg",
    "type": "series",
    "category": "刀劍神域",
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 15",
    "id": "sao-15"
  },
  {
    "id": "sao-16",
    "title": "刀劍神域 16",
    "subCategory": "",
    "genre": "",
    "category": "刀劍神域",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a66dcf439d001f3637bd/800x.webp?source_format=jpg",
    "author": "川原礫"
  },
  {
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a6258b49600013e0acf7/800x.webp?source_format=jpg",
    "author": "川原礫",
    "category": "刀劍神域",
    "type": "series",
    "subCategory": "",
    "title": "刀劍神域 17",
    "genre": "",
    "id": "sao-17"
  },
  {
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a5c6244ed4001c60583b/800x.webp?source_format=jpg",
    "type": "series",
    "category": "刀劍神域",
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 18",
    "id": "sao-18"
  },
  {
    "id": "sao-19",
    "genre": "",
    "title": "刀劍神域 19",
    "subCategory": "",
    "category": "刀劍神域",
    "type": "series",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a583dbcfa20019d446f5/800x.webp?source_format=jpg"
  },
  {
    "subCategory": "",
    "title": "刀劍神域 20",
    "genre": "",
    "id": "sao-20",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a53f7fc3750013b7f4bf/800x.webp?source_format=jpg",
    "author": "川原礫",
    "category": "刀劍神域",
    "type": "series"
  },
  {
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a4f069cb0d001f8103a2/800x.webp?source_format=jpg",
    "author": "川原礫",
    "type": "series",
    "category": "刀劍神域",
    "title": "刀劍神域 21",
    "subCategory": "",
    "genre": "",
    "id": "sao-21"
  },
  {
    "category": "刀劍神域",
    "type": "series",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662a4accf7e4c0019f7ffca/800x.webp?source_format=jpg",
    "id": "sao-22",
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 22"
  },
  {
    "category": "刀劍神域 Progressive",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662ae54cf7e4c1b56f71424/800x.webp?source_format=jpg",
    "author": "川原礫",
    "id": "sao-p-1",
    "subCategory": "",
    "title": "刀劍神域 Progressive 1",
    "genre": ""
  },
  {
    "id": "sao-p-2",
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 Progressive 2",
    "type": "series",
    "category": "刀劍神域 Progressive",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662ae261aeb10001c0f03f0/800x.webp?source_format=jpg"
  },
  {
    "id": "sao-p-3",
    "subCategory": "",
    "title": "刀劍神域 Progressive 3",
    "genre": "",
    "type": "series",
    "category": "刀劍神域 Progressive",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662adf73429980022abac20/800x.webp?source_format=jpg",
    "author": "川原礫"
  },
  {
    "type": "series",
    "category": "刀劍神域 Progressive",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662adc70b00cd0016fbf855/800x.webp?source_format=jpg",
    "id": "sao-p-4",
    "genre": "",
    "title": "刀劍神域 Progressive 4",
    "subCategory": ""
  },
  {
    "category": "刀劍神域 Progressive",
    "type": "series",
    "author": "川原礫",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662ad8ffc3d7d001c784a1a/800x.webp?source_format=jpg",
    "id": "sao-p-5",
    "genre": "",
    "subCategory": "",
    "title": "刀劍神域 Progressive 5"
  },
  {
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662ad64868307000dd76421/800x.webp?source_format=jpg",
    "author": "川原礫",
    "type": "series",
    "category": "刀劍神域 Progressive",
    "subCategory": "",
    "title": "刀劍神域 Progressive 6",
    "genre": "",
    "id": "sao-p-6"
  },
  {
    "type": "series",
    "tags": [],
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018001/NY0018001.jpg",
    "author": "佐伯さん",
    "id": "angel-next-door-1",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 1",
    "subCategory": "",
    "genre": ""
  },
  {
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018002/NY0018002.jpg",
    "author": "佐伯さん",
    "id": "angel-next-door-2",
    "subCategory": "",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 2",
    "genre": ""
  },
  {
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018003/NY0018003.jpg",
    "author": "佐伯さん",
    "id": "angel-next-door-3",
    "subCategory": "",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 3",
    "genre": ""
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018004/NY0018004.jpg",
    "author": "佐伯さん",
    "tags": [],
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "type": "series",
    "subCategory": "",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 4",
    "genre": "",
    "id": "angel-next-door-4"
  },
  {
    "id": "angel-next-door-5",
    "genre": "",
    "subCategory": "",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 5",
    "type": "series",
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "tags": [],
    "author": "佐伯さん",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018005/NY0018005.jpg"
  },
  {
    "subCategory": "",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 6",
    "genre": "",
    "id": "angel-next-door-6",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018006/NY0018006.jpg",
    "author": "佐伯さん",
    "type": "series",
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "tags": []
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018007/NY0018007.jpg",
    "author": "佐伯さん",
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "tags": [],
    "type": "series",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 7",
    "subCategory": "",
    "genre": "",
    "id": "angel-next-door-7"
  },
  {
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 8",
    "subCategory": "",
    "genre": "",
    "id": "angel-next-door-8",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018008/NY0018008.jpg",
    "author": "佐伯さん",
    "type": "series",
    "tags": [],
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事"
  },
  {
    "author": "佐伯さん",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018009/NY0018009.jpg",
    "type": "series",
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "tags": [],
    "genre": "",
    "subCategory": "",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 9",
    "id": "angel-next-door-9"
  },
  {
    "type": "series",
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "tags": [],
    "author": "佐伯さん",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018010/NY0018010.jpg",
    "id": "angel-next-door-10",
    "genre": "",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 10",
    "subCategory": ""
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0018/NY0018011/NY0018011.jpg",
    "author": "佐伯さん",
    "tags": [],
    "category": "關於我在無意間被隔壁的天使變成廢柴這件事",
    "type": "series",
    "subCategory": "",
    "title": "關於我在無意間被隔壁的天使變成廢柴這件事 11",
    "genre": "",
    "id": "angel-next-door-11"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "我是星際國家的英雄騎士！ 1",
    "id": "heroic-knight-1",
    "author": "三嶋與夢",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NW0038/NW0038001A/NW0038001A.jpg",
    "tags": [],
    "category": "我是星際國家的英雄騎士！",
    "type": "series"
  },
  {
    "id": "heroic-knight-2",
    "genre": "",
    "title": "我是星際國家的英雄騎士！ 2",
    "subCategory": "",
    "category": "我是星際國家的英雄騎士！",
    "tags": [],
    "type": "series",
    "author": "三嶋與夢",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NW0038/NW0038002A/NW0038002A.jpg"
  },
  {
    "author": "三嶋與夢",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NW0038/NW0038003/NW0038003.jpg",
    "type": "series",
    "tags": [],
    "category": "我是星際國家的英雄騎士！",
    "genre": "",
    "title": "我是星際國家的英雄騎士！ 3",
    "subCategory": "",
    "id": "heroic-knight-3"
  },
  {
    "id": "heroic-knight-4",
    "genre": "",
    "subCategory": "",
    "title": "我是星際國家的英雄騎士！ 4",
    "type": "series",
    "category": "我是星際國家的英雄騎士！",
    "tags": [],
    "author": "三嶋與夢",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NW0038/NW0038004/NW0038004.jpg"
  },
  {
    "author": "雨宮和希",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/ND0125/ND0125001A/ND0125001A.jpg",
    "type": "series",
    "tags": [],
    "category": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲",
    "genre": "",
    "subCategory": "",
    "title": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲 1",
    "id": "haibara-youth-1"
  },
  {
    "coverUrl": "",
    "author": "雨宮和希",
    "type": "series",
    "category": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲",
    "tags": [],
    "title": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲 2",
    "subCategory": "",
    "genre": "",
    "id": "haibara-youth-2"
  },
  {
    "tags": [],
    "category": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲",
    "type": "series",
    "coverUrl": "",
    "author": "雨宮和希",
    "id": "haibara-youth-3",
    "subCategory": "",
    "title": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲 3",
    "genre": ""
  },
  {
    "tags": [],
    "category": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲",
    "type": "series",
    "author": "雨宮和希",
    "coverUrl": "",
    "id": "haibara-youth-4",
    "genre": "",
    "subCategory": "",
    "title": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲 4"
  },
  {
    "coverUrl": "",
    "author": "雨宮和希",
    "tags": [],
    "category": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲",
    "type": "series",
    "title": "灰原同學重返過去，開啟所向無敵的第二輪青春遊戲 8",
    "subCategory": "",
    "genre": "",
    "id": "haibara-youth-8"
  },
  {
    "coverUrl": "",
    "author": "衣笠彰梧",
    "tags": [],
    "category": "歡迎來到實力至上主義的教室",
    "type": "series",
    "subCategory": "",
    "title": "歡迎來到實力至上主義的教室 1",
    "genre": "",
    "id": "classroom-elite-1"
  },
  {
    "type": "series",
    "tags": [],
    "category": "歡迎來到實力至上主義的教室",
    "author": "衣笠彰梧",
    "coverUrl": "",
    "id": "classroom-elite-2",
    "genre": "",
    "title": "歡迎來到實力至上主義的教室 2",
    "subCategory": ""
  },
  {
    "subCategory": "",
    "title": "歡迎來到實力至上主義的教室 3",
    "genre": "",
    "id": "classroom-elite-3",
    "coverUrl": "",
    "author": "衣笠彰梧",
    "type": "series",
    "tags": [],
    "category": "歡迎來到實力至上主義的教室"
  },
  {
    "coverUrl": "",
    "author": "衣笠彰梧",
    "tags": [],
    "category": "歡迎來到實力至上主義的教室",
    "type": "series",
    "title": "歡迎來到實力至上主義的教室 4",
    "subCategory": "",
    "genre": "",
    "id": "classroom-elite-4"
  },
  {
    "subCategory": "",
    "title": "歡迎來到實力至上主義的教室 5",
    "genre": "",
    "id": "classroom-elite-5",
    "coverUrl": "",
    "author": "衣笠彰梧",
    "type": "series",
    "category": "歡迎來到實力至上主義的教室",
    "tags": []
  },
  {
    "id": "classroom-elite-6",
    "genre": "",
    "subCategory": "",
    "title": "歡迎來到實力至上主義的教室 6",
    "type": "series",
    "tags": [],
    "category": "歡迎來到實力至上主義的教室",
    "author": "衣笠彰梧",
    "coverUrl": ""
  },
  {
    "id": "classroom-elite-7",
    "genre": "",
    "title": "歡迎來到實力至上主義的教室 7",
    "subCategory": "",
    "category": "歡迎來到實力至上主義的教室",
    "tags": [],
    "type": "series",
    "author": "衣笠彰梧",
    "coverUrl": ""
  },
  {
    "type": "series",
    "tags": [],
    "category": "歡迎來到實力至上主義的教室",
    "author": "衣笠彰梧",
    "coverUrl": "",
    "id": "classroom-elite-8",
    "genre": "",
    "title": "歡迎來到實力至上主義的教室 8",
    "subCategory": ""
  },
  {
    "id": "classroom-elite-9",
    "subCategory": "",
    "title": "歡迎來到實力至上主義的教室 9",
    "genre": "",
    "tags": [],
    "category": "歡迎來到實力至上主義的教室",
    "type": "series",
    "coverUrl": "",
    "author": "衣笠彰梧"
  },
  {
    "id": "classroom-elite-10",
    "title": "歡迎來到實力至上主義的教室 10",
    "subCategory": "",
    "genre": "",
    "category": "歡迎來到實力至上主義的教室",
    "tags": [],
    "type": "series",
    "coverUrl": "",
    "author": "衣笠彰梧"
  },
  {
    "coverUrl": "",
    "author": "衣笠彰梧",
    "tags": [],
    "category": "歡迎來到實力至上主義的教室",
    "type": "series",
    "title": "歡迎來到實力至上主義的教室 11",
    "subCategory": "",
    "genre": "",
    "id": "classroom-elite-11"
  },
  {
    "id": "evil-lord-2",
    "title": "我是星際國家的惡德領主！ 2",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "我是星際國家的惡德領主！",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NW0031/NW0031002A/NW0031002A.jpg",
    "author": "三嶋與夢"
  },
  {
    "type": "series",
    "tags": [],
    "category": "我是星際國家的惡德領主！",
    "author": "三嶋與夢",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NW0031/NW0031003A/NW0031003A.jpg",
    "id": "evil-lord-3",
    "genre": "",
    "subCategory": "",
    "title": "我是星際國家的惡德領主！ 3"
  },
  {
    "subCategory": "",
    "title": "我是星際國家的惡德領主！ 4",
    "genre": "",
    "id": "evil-lord-4",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NW0031/NW0031004A/NW0031004A.jpg",
    "author": "三嶋與夢",
    "category": "我是星際國家的惡德領主！",
    "tags": [],
    "type": "series"
  },
  {
    "id": "evil-lord-5",
    "title": "我是星際國家的惡德領主！ 5",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "category": "我是星際國家的惡德領主！",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NW0031/NW0031005A/NW0031005A.jpg",
    "author": "三嶋與夢"
  },
  {
    "title": "勇者症候群 1",
    "subCategory": "",
    "genre": "",
    "id": "brave-syndrome-1",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NB0034/NB0034001A/NB0034001A.jpg",
    "author": "彩月レイ",
    "type": "series",
    "category": "勇者症候群",
    "tags": []
  },
  {
    "id": "brave-syndrome-2",
    "genre": "",
    "title": "勇者症候群 2",
    "subCategory": "",
    "tags": [],
    "category": "勇者症候群",
    "type": "series",
    "author": "彩月レイ",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NB0034/NB0034002/NB0034002.jpg"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "其實是繼妹。～總覺得剛來的繼弟很黏我～ 1",
    "id": "actually-stepsister-1",
    "author": "白井ムク",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66da7cb7dfd27e000d111d5d/800x.webp?source_format=jpg",
    "type": "series",
    "category": "其實是繼妹。～總覺得剛來的繼弟很黏我～"
  },
  {
    "id": "actually-stepsister-2",
    "genre": "",
    "title": "其實是繼妹。～總覺得剛來的繼弟很黏我～ 2",
    "subCategory": "",
    "type": "series",
    "category": "其實是繼妹。～總覺得剛來的繼弟很黏我～",
    "author": "白井ムク",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66da7cb76de3690013bc194b/800x.webp?source_format=jpg"
  },
  {
    "author": "白井ムク",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66da7cb7f51b8f000d297234/800x.webp?source_format=jpg",
    "type": "series",
    "category": "其實是繼妹。～總覺得剛來的繼弟很黏我～",
    "genre": "",
    "subCategory": "",
    "title": "其實是繼妹。～總覺得剛來的繼弟很黏我～ 3",
    "id": "actually-stepsister-3"
  },
  {
    "genre": "",
    "title": "其實是繼妹。～總覺得剛來的繼弟很黏我～ 4",
    "subCategory": "",
    "id": "actually-stepsister-4",
    "author": "白井ムク",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66da7cb756ca55000da23582/800x.webp?source_format=jpg",
    "category": "其實是繼妹。～總覺得剛來的繼弟很黏我～",
    "type": "series"
  },
  {
    "id": "fallback-gf-1",
    "subCategory": "",
    "title": "我當備胎女友也沒關係。 1",
    "genre": "",
    "category": "我當備胎女友也沒關係。",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6698ac192ec7d900109b4498/800x.webp?source_format=jpg",
    "author": "西条陽"
  },
  {
    "type": "series",
    "category": "我當備胎女友也沒關係。",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6698ac19bd1c3d001f8b0044/800x.webp?source_format=jpg",
    "author": "西条陽",
    "id": "fallback-gf-2",
    "subCategory": "",
    "title": "我當備胎女友也沒關係。 2",
    "genre": ""
  },
  {
    "genre": "",
    "title": "我當備胎女友也沒關係。 3",
    "subCategory": "",
    "id": "fallback-gf-3",
    "author": "西条陽",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6698ac18514389001699d43c/800x.webp?source_format=jpg",
    "type": "series",
    "category": "我當備胎女友也沒關係。"
  },
  {
    "category": "我當備胎女友也沒關係。",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6698ac17e2b5e40010b490a3/800x.webp?source_format=jpg",
    "author": "西条陽",
    "id": "fallback-gf-4",
    "title": "我當備胎女友也沒關係。 4",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "sister-not-gf-1",
    "title": "妹妹是不能當女友的，可是…… 1",
    "subCategory": "",
    "genre": "",
    "tags": [],
    "category": "妹妹是不能當女友的，可是……",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NB0032/NB0032001A/NB0032001A.jpg",
    "author": "鏡遊"
  },
  {
    "subCategory": "",
    "title": "妹妹是不能當女友的，可是…… 2",
    "genre": "",
    "id": "sister-not-gf-2",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NB0032/NB0032002A/NB0032002A.jpg",
    "author": "鏡遊",
    "type": "series",
    "tags": [],
    "category": "妹妹是不能當女友的，可是……"
  },
  {
    "id": "reincarnation-escape-1",
    "genre": "",
    "title": "你以為區區轉生就逃得了嗎，哥哥？ 1",
    "subCategory": "",
    "type": "series",
    "category": "你以為區區轉生就逃得了嗎，哥哥？",
    "tags": [],
    "author": "紙城境介",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0133/NA0133001A/NA0133001A.jpg"
  },
  {
    "genre": "",
    "title": "你以為區區轉生就逃得了嗎，哥哥？ 2",
    "subCategory": "",
    "id": "reincarnation-escape-2",
    "author": "紙城境介",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0133/NA0133002A/NA0133002A.jpg",
    "type": "series",
    "category": "你以為區區轉生就逃得了嗎，哥哥？",
    "tags": []
  },
  {
    "id": "reincarnation-escape-3",
    "genre": "",
    "subCategory": "",
    "title": "你以為區區轉生就逃得了嗎，哥哥？ 3",
    "type": "series",
    "tags": [],
    "category": "你以為區區轉生就逃得了嗎，哥哥？",
    "author": "紙城境介",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0133/NA0133003A/NA0133003A.jpg"
  },
  {
    "tags": [],
    "category": "遊戲人生",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0065/NA0065001/NA0065001.jpg",
    "author": "榎宮祐",
    "id": "ngnl-1",
    "title": "遊戲人生 1",
    "subCategory": "",
    "genre": ""
  },
  {
    "category": "遊戲人生",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0065/NA0065002/NA0065002.jpg",
    "author": "榎宮祐",
    "id": "ngnl-2",
    "subCategory": "",
    "title": "遊戲人生 2",
    "genre": ""
  },
  {
    "category": "遊戲人生",
    "tags": [],
    "type": "series",
    "author": "榎宮祐",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0065/NA0065003/NA0065003.jpg",
    "id": "ngnl-3",
    "genre": "",
    "subCategory": "",
    "title": "遊戲人生 3"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0065/NA0065004/NA0065004.jpg",
    "author": "榎宮祐",
    "tags": [],
    "category": "遊戲人生",
    "type": "series",
    "title": "遊戲人生 4",
    "subCategory": "",
    "genre": "",
    "id": "ngnl-4"
  },
  {
    "type": "series",
    "tags": [],
    "category": "遊戲人生",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0065/NA0065005/NA0065005.jpg",
    "author": "榎宮祐",
    "id": "ngnl-5",
    "title": "遊戲人生 5",
    "subCategory": "",
    "genre": ""
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "遊戲人生 6",
    "id": "ngnl-6",
    "author": "榎宮祐",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0065/NA0065006/NA0065006.jpg",
    "category": "遊戲人生",
    "tags": [],
    "type": "series"
  },
  {
    "id": "ngnl-10",
    "genre": "",
    "title": "遊戲人生 10",
    "subCategory": "",
    "tags": [],
    "category": "遊戲人生",
    "type": "series",
    "author": "榎宮祐",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NA0065/NA0065010/NA0065010.jpg"
  },
  {
    "author": "白石定規",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681450442008/ec1284803.jpg",
    "category": "魔女之旅",
    "tags": [],
    "type": "series",
    "genre": "",
    "title": "魔女之旅 1",
    "subCategory": "",
    "id": "elaina-1"
  },
  {
    "type": "series",
    "tags": [],
    "category": "魔女之旅",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681541283008/750115.jpg",
    "author": "白石定規",
    "id": "elaina-2",
    "title": "魔女之旅 2",
    "subCategory": "",
    "genre": ""
  },
  {
    "subCategory": "",
    "title": "魔女之旅 3",
    "genre": "",
    "id": "elaina-3",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681582032009/783864.jpg",
    "author": "白石定規",
    "category": "魔女之旅",
    "tags": [],
    "type": "series"
  },
  {
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681682058008/20190422115255586276.jpg",
    "author": "白石定規",
    "category": "魔女之旅",
    "tags": [],
    "type": "series",
    "title": "魔女之旅 4",
    "subCategory": "",
    "genre": "",
    "id": "elaina-4"
  },
  {
    "tags": [],
    "category": "魔女之旅",
    "type": "series",
    "author": "白石定規",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681758300000/ec1759843.jpg",
    "id": "elaina-5",
    "genre": "",
    "subCategory": "",
    "title": "魔女之旅 5"
  },
  {
    "author": "白石定規",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681783217007/20190709041132190216.jpg",
    "type": "series",
    "tags": [],
    "category": "魔女之旅",
    "genre": "",
    "title": "魔女之旅 6",
    "subCategory": "",
    "id": "elaina-6"
  },
  {
    "author": "白石定規",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681860927003/20200307041627865600.jpg",
    "type": "series",
    "category": "魔女之旅",
    "tags": [],
    "genre": "",
    "title": "魔女之旅 7",
    "subCategory": "",
    "id": "elaina-7"
  },
  {
    "genre": "",
    "title": "魔女之旅 8",
    "subCategory": "",
    "id": "elaina-8",
    "author": "白石定規",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/Upload/Product/202008/o/637320404263072500.jpg",
    "type": "series",
    "category": "魔女之旅",
    "tags": []
  },
  {
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681929392001/20201014034301726030.jpg",
    "author": "白石定規",
    "type": "series",
    "tags": [],
    "category": "魔女之旅",
    "title": "魔女之旅 9",
    "subCategory": "",
    "genre": "",
    "id": "elaina-9"
  },
  {
    "id": "elaina-10",
    "title": "魔女之旅 10",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "魔女之旅",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681956403008/20201215041632641832.jpg",
    "author": "白石定規"
  },
  {
    "id": "elaina-11",
    "genre": "",
    "subCategory": "",
    "title": "魔女之旅 11",
    "type": "series",
    "tags": [],
    "category": "魔女之旅",
    "author": "白石定規",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681975616007/20210126033715568863.jpg"
  },
  {
    "tags": [],
    "category": "魔女之旅",
    "type": "series",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682049095001/20210723093353866706.jpg",
    "author": "白石定規",
    "id": "elaina-12",
    "subCategory": "",
    "title": "魔女之旅 12",
    "genre": ""
  },
  {
    "title": "魔女之旅 13",
    "subCategory": "",
    "genre": "",
    "id": "elaina-13",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682054464007/20210804035407381516.jpg",
    "author": "白石定規",
    "tags": [],
    "category": "魔女之旅",
    "type": "series"
  },
  {
    "subCategory": "",
    "title": "魔女之旅 14",
    "genre": "",
    "id": "elaina-14",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682120579000/20220111032125520436.jpg",
    "author": "白石定規",
    "tags": [],
    "category": "魔女之旅",
    "type": "series"
  },
  {
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682147219002/20220317033732170071.jpg",
    "author": "白石定規",
    "type": "series",
    "tags": [],
    "category": "魔女之旅",
    "subCategory": "",
    "title": "魔女之旅 15",
    "genre": "",
    "id": "elaina-15"
  },
  {
    "author": "白石定規",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682193190003/20220624035349823377.jpg",
    "type": "series",
    "tags": [],
    "category": "魔女之旅",
    "genre": "",
    "title": "魔女之旅 16",
    "subCategory": "",
    "id": "elaina-16"
  },
  {
    "category": "魔女之旅",
    "tags": [],
    "type": "series",
    "author": "白石定規",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682214948002/20220727033420425643.jpg",
    "id": "elaina-17",
    "genre": "",
    "title": "魔女之旅 17",
    "subCategory": ""
  },
  {
    "type": "series",
    "category": "約會大作戰",
    "tags": [],
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fdeefff542f0010afd4be/800x.webp?source_format=jpg",
    "author": "橘公司",
    "id": "date-a-live-1",
    "subCategory": "",
    "title": "約會大作戰 1",
    "genre": ""
  },
  {
    "id": "date-a-live-2",
    "title": "約會大作戰 2",
    "subCategory": "",
    "genre": "",
    "category": "約會大作戰",
    "tags": [],
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fdee625e608001f779686/800x.webp?source_format=jpg",
    "author": "橘公司"
  },
  {
    "category": "約會大作戰",
    "tags": [],
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fde6e36c9a600228ba21f/800x.webp?source_format=jpg",
    "author": "橘公司",
    "id": "date-a-live-3",
    "title": "約會大作戰 3",
    "subCategory": "",
    "genre": ""
  },
  {
    "type": "series",
    "tags": [],
    "category": "約會大作戰",
    "author": "橘公司",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fdc4e3f6608000d1e551d/800x.webp?source_format=jpg",
    "id": "date-a-live-4",
    "genre": "",
    "subCategory": "",
    "title": "約會大作戰 4"
  },
  {
    "id": "date-a-live-5",
    "subCategory": "",
    "title": "約會大作戰 5",
    "genre": "",
    "tags": [],
    "category": "約會大作戰",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fdbf926e99d0010eb3fa4/800x.webp?source_format=jpg",
    "author": "橘公司"
  },
  {
    "category": "約會大作戰",
    "tags": [],
    "type": "series",
    "author": "橘公司",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fdbc127c4530016fb839e/800x.webp?source_format=jpg",
    "id": "date-a-live-6",
    "genre": "",
    "subCategory": "",
    "title": "約會大作戰 6"
  },
  {
    "genre": "",
    "title": "約會大作戰 7",
    "subCategory": "",
    "id": "date-a-live-7",
    "author": "橘公司",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fdb715c22c3000df1519b/800x.webp?source_format=jpg",
    "tags": [],
    "category": "約會大作戰",
    "type": "series"
  },
  {
    "title": "約會大作戰 8",
    "subCategory": "",
    "genre": "",
    "id": "date-a-live-8",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fdb39fded9d001cafb3ae/800x.webp?source_format=jpg",
    "author": "橘公司",
    "tags": [],
    "category": "約會大作戰",
    "type": "series"
  },
  {
    "tags": [],
    "category": "約會大作戰",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fdafaca76280010555660/800x.webp?source_format=jpg",
    "author": "橘公司",
    "id": "date-a-live-9",
    "title": "約會大作戰 9",
    "subCategory": "",
    "genre": ""
  },
  {
    "type": "series",
    "category": "約會大作戰",
    "tags": [],
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fdab9cd880d0019a6350c/800x.webp?source_format=jpg",
    "author": "橘公司",
    "id": "date-a-live-10",
    "title": "約會大作戰 10",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "date-a-live-11",
    "genre": "",
    "subCategory": "",
    "title": "約會大作戰 11",
    "type": "series",
    "tags": [],
    "category": "約會大作戰",
    "author": "橘公司",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fda665640c00016796f50/800x.webp?source_format=jpg"
  },
  {
    "type": "series",
    "tags": [],
    "category": "約會大作戰",
    "author": "橘公司",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fda1cd313900010dd8415/800x.webp?source_format=jpg",
    "id": "date-a-live-12",
    "genre": "",
    "title": "約會大作戰 12",
    "subCategory": ""
  },
  {
    "id": "date-a-live-13",
    "title": "約會大作戰 13",
    "subCategory": "",
    "genre": "",
    "tags": [],
    "category": "約會大作戰",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fd9dd36c9a600168ba129/800x.webp?source_format=jpg",
    "author": "橘公司"
  },
  {
    "genre": "",
    "title": "約會大作戰 14",
    "subCategory": "",
    "id": "date-a-live-14",
    "author": "橘公司",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fd9864ff629001634b8f6/800x.webp?source_format=jpg",
    "category": "約會大作戰",
    "tags": [],
    "type": "series"
  },
  {
    "id": "date-a-live-15",
    "title": "約會大作戰 15",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "約會大作戰",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/665fd9548b49600016dfb5b0/800x.webp?source_format=jpg",
    "author": "橘公司"
  },
  {
    "subCategory": "",
    "title": "無職轉生 1",
    "genre": "",
    "id": "mushoku-1",
    "coverUrl": "",
    "author": "理不尽な孫の手",
    "type": "series",
    "category": "無職轉生",
    "tags": []
  },
  {
    "coverUrl": "",
    "author": "理不尽な孫の手",
    "type": "series",
    "tags": [],
    "category": "無職轉生",
    "title": "無職轉生 2",
    "subCategory": "",
    "genre": "",
    "id": "mushoku-2"
  },
  {
    "id": "mushoku-26",
    "genre": "",
    "subCategory": "",
    "title": "無職轉生 26",
    "type": "series",
    "tags": [],
    "category": "無職轉生",
    "author": "理不尽な孫の手",
    "coverUrl": ""
  },
  {
    "id": "86-1",
    "title": "86不存在的戰區 1",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "category": "86不存在的戰區",
    "tags": [],
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c24bffbc51c935e14fd4/800x.webp?source_format=jpg",
    "author": "安里アサト"
  },
  {
    "author": "安里アサト",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c21d2a1bb3001fef7c46/800x.webp?source_format=jpg",
    "tags": [],
    "category": "86不存在的戰區",
    "type": "series",
    "genre": "",
    "title": "86不存在的戰區 2",
    "subCategory": "",
    "id": "86-2"
  },
  {
    "category": "86不存在的戰區",
    "tags": [],
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c1e98179f8000d93002b/800x.webp?source_format=jpg",
    "author": "安里アサト",
    "id": "86-3",
    "subCategory": "",
    "title": "86不存在的戰區 3",
    "genre": ""
  },
  {
    "genre": "",
    "title": "86不存在的戰區 4",
    "subCategory": "",
    "id": "86-4",
    "author": "安里アサト",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c1bce10d700022a657c8/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [],
    "category": "86不存在的戰區"
  },
  {
    "subCategory": "",
    "title": "86不存在的戰區 5",
    "genre": "",
    "id": "86-5",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c1853f660800191f62ea/800x.webp?source_format=jpg",
    "author": "安里アサト",
    "category": "86不存在的戰區",
    "tags": [],
    "type": "series"
  },
  {
    "author": "安里アサト",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c15abc93ff001038fd64/800x.webp?source_format=jpg",
    "category": "86不存在的戰區",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "86不存在的戰區 6",
    "id": "86-6"
  },
  {
    "type": "series",
    "category": "86不存在的戰區",
    "tags": [],
    "author": "安里アサト",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c1285c867d001981ba60/800x.webp?source_format=jpg",
    "id": "86-7",
    "genre": "",
    "title": "86不存在的戰區 7",
    "subCategory": ""
  },
  {
    "title": "86不存在的戰區 8",
    "subCategory": "",
    "genre": "",
    "id": "86-8",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c0bacef4db002281ea5b/800x.webp?source_format=jpg",
    "author": "安里アサト",
    "type": "series",
    "category": "86不存在的戰區",
    "tags": []
  },
  {
    "author": "安里アサト",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c065ca7628001f565afe/800x.webp?source_format=jpg",
    "category": "86不存在的戰區",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "86不存在的戰區 9",
    "id": "86-9"
  },
  {
    "author": "安里アサト",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6662c00efc3d7d000d784da1/800x.webp?source_format=jpg",
    "category": "86不存在的戰區",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "86不存在的戰區 10",
    "id": "86-10"
  },
  {
    "subCategory": "",
    "title": "気になってる人が男じゃなかった 1",
    "genre": "",
    "id": "green-tea-1",
    "coverUrl": "https://m.media-amazon.com/images/I/81Vz14AaG4L._SY425_.jpg",
    "author": "新井 すみこ",
    "type": "series",
    "category": "気になってる人が男じゃなかった"
  },
  {
    "id": "green-tea-2",
    "subCategory": "",
    "title": "気になってる人が男じゃなかった 2",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "気になってる人が男じゃなかった",
    "coverUrl": "https://m.media-amazon.com/images/I/91nk8m3muJL._SY425_.jpg",
    "author": "新井 すみこ"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 1",
    "id": "jujutsu-1",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116001A/JC1116001AS.jpg",
    "tags": [],
    "category": "咒術迴戰",
    "type": "series"
  },
  {
    "type": "series",
    "category": "咒術迴戰",
    "tags": [],
    "author": "芥見下々",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681761107009/ec1763803.jpg",
    "id": "jujutsu-2",
    "genre": "",
    "title": "咒術迴戰 2",
    "subCategory": ""
  },
  {
    "genre": "",
    "title": "咒術迴戰 3",
    "subCategory": "",
    "id": "jujutsu-3",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116003/JC1116003.jpg",
    "tags": [],
    "category": "咒術迴戰",
    "type": "series"
  },
  {
    "type": "series",
    "tags": [],
    "category": "咒術迴戰",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116004/JC1116004.jpg",
    "author": "芥見下々",
    "id": "jujutsu-4",
    "title": "咒術迴戰 4",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jujutsu-5",
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 5",
    "type": "series",
    "category": "咒術迴戰",
    "tags": [],
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116005/JC1116005.jpg"
  },
  {
    "type": "series",
    "category": "咒術迴戰",
    "tags": [],
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116006/JC1116006.jpg",
    "id": "jujutsu-6",
    "genre": "",
    "title": "咒術迴戰 6",
    "subCategory": ""
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116007/JC1116007.jpg",
    "author": "芥見下々",
    "type": "series",
    "category": "咒術迴戰",
    "tags": [],
    "title": "咒術迴戰 7",
    "subCategory": "",
    "genre": "",
    "id": "jujutsu-7"
  },
  {
    "id": "jujutsu-8",
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 8",
    "category": "咒術迴戰",
    "tags": [],
    "type": "series",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116008/JC1116008.jpg"
  },
  {
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116009/JC1116009.jpg",
    "type": "series",
    "category": "咒術迴戰",
    "tags": [],
    "genre": "",
    "title": "咒術迴戰 9",
    "subCategory": "",
    "id": "jujutsu-9"
  },
  {
    "id": "jujutsu-10",
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 10",
    "tags": [],
    "category": "咒術迴戰",
    "type": "series",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116010/JC1116010.jpg"
  },
  {
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116011/JC1116011.jpg",
    "category": "咒術迴戰",
    "tags": [],
    "type": "series",
    "genre": "",
    "title": "咒術迴戰 11",
    "subCategory": "",
    "id": "jujutsu-11"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 12",
    "id": "jujutsu-12",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116012/JC1116012.jpg",
    "type": "series",
    "category": "咒術迴戰",
    "tags": []
  },
  {
    "type": "series",
    "category": "咒術迴戰",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116013/JC1116013.jpg",
    "author": "芥見下々",
    "id": "jujutsu-13",
    "title": "咒術迴戰 13",
    "subCategory": "",
    "genre": ""
  },
  {
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116014/JC1116014.jpg",
    "category": "咒術迴戰",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 14",
    "id": "jujutsu-14"
  },
  {
    "type": "series",
    "tags": [],
    "category": "咒術迴戰",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116015/JC1116015.jpg",
    "id": "jujutsu-15",
    "genre": "",
    "title": "咒術迴戰 15",
    "subCategory": ""
  },
  {
    "category": "咒術迴戰",
    "tags": [],
    "type": "series",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116016/JC1116016.jpg",
    "id": "jujutsu-16",
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 16"
  },
  {
    "category": "咒術迴戰",
    "tags": [],
    "type": "series",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116017/JC1116017.jpg",
    "id": "jujutsu-17",
    "genre": "",
    "title": "咒術迴戰 17",
    "subCategory": ""
  },
  {
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116018/JC1116018.jpg",
    "type": "series",
    "category": "咒術迴戰",
    "tags": [],
    "genre": "",
    "title": "咒術迴戰 18",
    "subCategory": "",
    "id": "jujutsu-18"
  },
  {
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116019/JC1116019.jpg",
    "type": "series",
    "tags": [],
    "category": "咒術迴戰",
    "genre": "",
    "title": "咒術迴戰 19",
    "subCategory": "",
    "id": "jujutsu-19"
  },
  {
    "id": "jujutsu-20",
    "subCategory": "",
    "title": "咒術迴戰 20",
    "genre": "",
    "type": "series",
    "category": "咒術迴戰",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116020/JC1116020.jpg",
    "author": "芥見下々"
  },
  {
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116021/JC1116021.jpg",
    "category": "咒術迴戰",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 21",
    "id": "jujutsu-21"
  },
  {
    "subCategory": "",
    "title": "咒術迴戰 22",
    "genre": "",
    "id": "jujutsu-22",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116022/JC1116022.jpg",
    "author": "芥見下々",
    "category": "咒術迴戰",
    "tags": [],
    "type": "series"
  },
  {
    "subCategory": "",
    "title": "咒術迴戰 23",
    "genre": "",
    "id": "jujutsu-23",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116023/JC1116023.jpg",
    "author": "芥見下々",
    "tags": [],
    "category": "咒術迴戰",
    "type": "series"
  },
  {
    "title": "咒術迴戰 24",
    "subCategory": "",
    "genre": "",
    "id": "jujutsu-24",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116024/JC1116024.jpg",
    "author": "芥見下々",
    "category": "咒術迴戰",
    "tags": [],
    "type": "series"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 25",
    "id": "jujutsu-25",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116025/JC1116025.jpg",
    "type": "series",
    "tags": [],
    "category": "咒術迴戰"
  },
  {
    "id": "jujutsu-26",
    "subCategory": "",
    "title": "咒術迴戰 26",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "咒術迴戰",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116026/JC1116026.jpg",
    "author": "芥見下々"
  },
  {
    "id": "jujutsu-27",
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 27",
    "type": "series",
    "category": "咒術迴戰",
    "tags": [],
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116027/JC1116027.jpg"
  },
  {
    "id": "jujutsu-28",
    "genre": "",
    "title": "咒術迴戰 28",
    "subCategory": "",
    "category": "咒術迴戰",
    "tags": [],
    "type": "series",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116028/JC1116028.jpg"
  },
  {
    "id": "jujutsu-29",
    "subCategory": "",
    "title": "咒術迴戰 29",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "咒術迴戰",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116029/JC1116029.jpg",
    "author": "芥見下々"
  },
  {
    "type": "series",
    "tags": [],
    "category": "咒術迴戰",
    "author": "芥見下々",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1116/JC1116030/JC1116030.jpg",
    "id": "jujutsu-30",
    "genre": "",
    "subCategory": "",
    "title": "咒術迴戰 30"
  },
  {
    "id": "kick-love-1",
    "subCategory": "",
    "title": "不踹不踩不成愛 1",
    "genre": "",
    "type": "series",
    "category": "不踹不踩不成愛",
    "tags": [],
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/67f73aeab7d253000cc2dc86/800x.webp?source_format=jpg",
    "author": "壱屋すみ"
  },
  {
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/67f73aea17aec30011b27f43/800x.webp?source_format=jpg",
    "author": "壱屋すみ",
    "type": "series",
    "tags": [],
    "category": "不踹不踩不成愛",
    "title": "不踹不踩不成愛 2",
    "subCategory": "",
    "genre": "",
    "id": "kick-love-2"
  },
  {
    "tags": [],
    "category": "不踹不踩不成愛",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/67f73aea851df9000efb9858/800x.webp?source_format=jpg",
    "author": "壱屋すみ",
    "id": "kick-love-3",
    "title": "不踹不踩不成愛 3",
    "subCategory": "",
    "genre": ""
  },
  {
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/67f73aeb81c977000ebb5715/800x.webp?source_format=jpg",
    "author": "壱屋すみ",
    "type": "series",
    "category": "不踹不踩不成愛",
    "tags": [],
    "subCategory": "",
    "title": "不踹不踩不成愛 4",
    "genre": "",
    "id": "kick-love-4"
  },
  {
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0b09227fc220022982503/800x.webp?source_format=jpg",
    "author": "金丸祐基",
    "category": "夫婦以上，戀人未滿",
    "tags": [],
    "type": "series",
    "subCategory": "",
    "title": "夫婦以上，戀人未滿 1",
    "genre": "",
    "id": "fuufu-1"
  },
  {
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0b092f597a900105eca71/800x.webp?source_format=jpg",
    "author": "金丸祐基",
    "type": "series",
    "category": "夫婦以上，戀人未滿",
    "tags": [],
    "title": "夫婦以上，戀人未滿 2",
    "subCategory": "",
    "genre": "",
    "id": "fuufu-2"
  },
  {
    "id": "fuufu-3",
    "genre": "",
    "subCategory": "",
    "title": "夫婦以上，戀人未滿 3",
    "type": "series",
    "tags": [],
    "category": "夫婦以上，戀人未滿",
    "author": "金丸祐基",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0b0920075c40013e72c3c/800x.webp?source_format=jpg"
  },
  {
    "author": "金丸祐基",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0b09205bc766ff61358e5/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [],
    "category": "夫婦以上，戀人未滿",
    "genre": "",
    "title": "夫婦以上，戀人未滿 4",
    "subCategory": "",
    "id": "fuufu-4"
  },
  {
    "tags": [],
    "category": "夫婦以上，戀人未滿",
    "type": "series",
    "author": "金丸祐基",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0b092d28abc000db5aad4/800x.webp?source_format=jpg",
    "id": "fuufu-5",
    "genre": "",
    "subCategory": "",
    "title": "夫婦以上，戀人未滿 5"
  },
  {
    "tags": [],
    "category": "夫婦以上，戀人未滿",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0b092f378ef001f47a3e3/800x.webp?source_format=jpg",
    "author": "金丸祐基",
    "id": "fuufu-6",
    "title": "夫婦以上，戀人未滿 6",
    "subCategory": "",
    "genre": ""
  },
  {
    "title": "夫婦以上，戀人未滿 7",
    "subCategory": "",
    "genre": "",
    "id": "fuufu-7",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0b0934940014e778e7726/800x.webp?source_format=jpg",
    "author": "金丸祐基",
    "type": "series",
    "category": "夫婦以上，戀人未滿",
    "tags": []
  },
  {
    "author": "金丸祐基",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0b09284a646000dd8d764/800x.webp?source_format=jpg",
    "tags": [],
    "category": "夫婦以上，戀人未滿",
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "夫婦以上，戀人未滿 8",
    "id": "fuufu-8"
  },
  {
    "type": "series",
    "category": "夫婦以上，戀人未滿",
    "tags": [],
    "author": "金丸祐基",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0b092b1c3e00022c4b8f7/800x.webp?source_format=jpg",
    "id": "fuufu-9",
    "genre": "",
    "subCategory": "",
    "title": "夫婦以上，戀人未滿 9"
  },
  {
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66a0ae49536b09ca9cc5c433/800x.webp?source_format=jpg",
    "author": "金丸祐基",
    "type": "series",
    "tags": [],
    "category": "夫婦以上，戀人未滿",
    "subCategory": "",
    "title": "夫婦以上，戀人未滿 10",
    "genre": "",
    "id": "fuufu-10"
  },
  {
    "genre": "",
    "title": "夫婦以上，戀人未滿 11",
    "subCategory": "",
    "id": "fuufu-11",
    "author": "金丸祐基",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/680ee1c1b3cc9d000dcb4e07/800x.webp?source_format=jpg",
    "tags": [],
    "category": "夫婦以上，戀人未滿",
    "type": "series"
  },
  {
    "category": "黑貓與魔女的教室",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1749/KD1749001A/KD1749001A.jpg",
    "author": "金田陽介",
    "id": "black-cat-1",
    "subCategory": "",
    "title": "黑貓與魔女的教室 1",
    "genre": ""
  },
  {
    "author": "金田陽介",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1749/KD1749002A/KD1749002A.jpg",
    "category": "黑貓與魔女的教室",
    "tags": [],
    "type": "series",
    "genre": "",
    "title": "黑貓與魔女的教室 2",
    "subCategory": "",
    "id": "black-cat-2"
  },
  {
    "id": "black-cat-3",
    "genre": "",
    "title": "黑貓與魔女的教室 3",
    "subCategory": "",
    "tags": [],
    "category": "黑貓與魔女的教室",
    "type": "series",
    "author": "金田陽介",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1749/KD1749003A/KD1749003A.jpg"
  },
  {
    "title": "黑貓與魔女的教室 4",
    "subCategory": "",
    "genre": "",
    "id": "black-cat-4",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1749/KD1749004/KD1749004.jpg",
    "author": "金田陽介",
    "tags": [],
    "category": "黑貓與魔女的教室",
    "type": "series"
  },
  {
    "genre": "",
    "title": "黑貓與魔女的教室 5",
    "subCategory": "",
    "id": "black-cat-5",
    "author": "金田陽介",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1749/KD1749005/KD1749005.jpg",
    "type": "series",
    "category": "黑貓與魔女的教室",
    "tags": []
  },
  {
    "id": "black-cat-6",
    "genre": "",
    "subCategory": "",
    "title": "黑貓與魔女的教室 6",
    "category": "黑貓與魔女的教室",
    "tags": [],
    "type": "series",
    "author": "金田陽介",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1749/KD1749006/KD1749006.jpg"
  },
  {
    "genre": "",
    "title": "沉默魔女的秘密 1",
    "subCategory": "",
    "id": "silent-witch-1",
    "author": "依空まつり",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6699e1a1b9c78b0016ecd18c/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [],
    "category": "沉默魔女的秘密"
  },
  {
    "tags": [],
    "category": "沉默魔女的秘密",
    "type": "series",
    "author": "依空まつり",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6699e1a23fab53000d627355/800x.webp?source_format=jpg",
    "id": "silent-witch-2",
    "genre": "",
    "subCategory": "",
    "title": "沉默魔女的秘密 2"
  },
  {
    "author": "依空まつり",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6699e1a21cd78d000d912a14/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [],
    "category": "沉默魔女的秘密",
    "genre": "",
    "title": "沉默魔女的秘密 3",
    "subCategory": "",
    "id": "silent-witch-3"
  },
  {
    "id": "silent-witch-4",
    "genre": "",
    "subCategory": "",
    "title": "沉默魔女的秘密 4",
    "type": "series",
    "tags": [],
    "category": "沉默魔女的秘密",
    "author": "依空まつり",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6699e1a188a36e001c59a9f9/800x.webp?source_format=jpg"
  },
  {
    "genre": "",
    "title": "沉默魔女的秘密 5",
    "subCategory": "",
    "id": "silent-witch-5",
    "author": "依空まつり",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6699e1a116a9f7001927e526/800x.webp?source_format=jpg",
    "tags": [],
    "category": "沉默魔女的秘密",
    "type": "series"
  },
  {
    "title": "沉默魔女的秘密 6",
    "subCategory": "",
    "genre": "",
    "id": "silent-witch-6",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6699e1373cb5290016a57ebf/800x.webp?source_format=jpg",
    "author": "依空まつり",
    "tags": [],
    "category": "沉默魔女的秘密",
    "type": "series"
  },
  {
    "type": "series",
    "category": "王者的求婚",
    "tags": [],
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66403c469b88f10022fee1d0/800x.webp?source_format=jpg",
    "author": "橘公司",
    "id": "kings-prop-1",
    "title": "王者的求婚 1",
    "subCategory": "",
    "genre": ""
  },
  {
    "genre": "",
    "title": "王者的求婚 2",
    "subCategory": "",
    "id": "kings-prop-2",
    "author": "橘公司",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/664028eac851b60013fff368/800x.webp?source_format=jpg",
    "category": "王者的求婚",
    "tags": [],
    "type": "series"
  },
  {
    "subCategory": "",
    "title": "才女的侍從 1",
    "genre": "",
    "id": "saijo-1",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/ND0117/ND0117001A/ND0117001A.jpg",
    "author": "坂石遊",
    "category": "才女的侍從",
    "tags": [],
    "type": "series"
  },
  {
    "tags": [],
    "category": "才女的侍從",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/ND0117/ND0117002B/ND0117002B.jpg",
    "author": "坂石遊",
    "id": "saijo-2",
    "title": "才女的侍從 2",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "saijo-3",
    "title": "才女的侍從 3",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "category": "才女的侍從",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/ND0117/ND0117003A/ND0117003A.jpg",
    "author": "坂石遊"
  },
  {
    "id": "saijo-4",
    "genre": "",
    "subCategory": "",
    "title": "才女的侍從 4",
    "type": "series",
    "category": "才女的侍從",
    "tags": [],
    "author": "坂石遊",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/ND0117/ND0117004B/ND0117004B.jpg"
  },
  {
    "genre": "",
    "title": "朋友的妹妹只纏著我 2",
    "subCategory": "",
    "id": "imo-uza-2",
    "author": "三河ごーすと",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0016/NY0016002/NY0016002.jpg",
    "tags": [],
    "category": "朋友的妹妹只纏著我",
    "type": "series"
  },
  {
    "tags": [],
    "category": "朋友的妹妹只纏著我",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0016/NY0016003/NY0016003.jpg",
    "author": "三河ごーすと",
    "id": "imo-uza-3",
    "title": "朋友的妹妹只纏著我 3",
    "subCategory": "",
    "genre": ""
  },
  {
    "subCategory": "",
    "title": "朋友的妹妹只纏著我 4",
    "genre": "",
    "id": "imo-uza-4",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/NY0016/NY0016004/NY0016004.jpg",
    "author": "三河ごーすと",
    "type": "series",
    "category": "朋友的妹妹只纏著我",
    "tags": []
  },
  {
    "coverUrl": "",
    "author": "河本焰/尚村透",
    "category": "狂賭之淵",
    "tags": [],
    "type": "series",
    "subCategory": "",
    "title": "狂賭之淵 1",
    "genre": "",
    "id": "kakegurui-1"
  },
  {
    "id": "kakegurui-2",
    "genre": "",
    "subCategory": "",
    "title": "狂賭之淵 2",
    "type": "series",
    "category": "狂賭之淵",
    "tags": [],
    "author": "河本焰/尚村透",
    "coverUrl": ""
  },
  {
    "type": "series",
    "category": "狂賭之淵",
    "tags": [],
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "id": "kakegurui-3",
    "genre": "",
    "title": "狂賭之淵 3",
    "subCategory": ""
  },
  {
    "type": "series",
    "category": "狂賭之淵",
    "tags": [],
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "id": "kakegurui-4",
    "genre": "",
    "subCategory": "",
    "title": "狂賭之淵 4"
  },
  {
    "coverUrl": "",
    "author": "河本焰/尚村透",
    "type": "series",
    "category": "狂賭之淵",
    "tags": [],
    "subCategory": "",
    "title": "狂賭之淵 5",
    "genre": "",
    "id": "kakegurui-5"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "狂賭之淵 6",
    "id": "kakegurui-6",
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "type": "series",
    "category": "狂賭之淵",
    "tags": []
  },
  {
    "id": "kakegurui-7",
    "subCategory": "",
    "title": "狂賭之淵 7",
    "genre": "",
    "category": "狂賭之淵",
    "tags": [],
    "type": "series",
    "coverUrl": "",
    "author": "河本焰/尚村透"
  },
  {
    "type": "series",
    "category": "狂賭之淵",
    "tags": [],
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "id": "kakegurui-8",
    "genre": "",
    "subCategory": "",
    "title": "狂賭之淵 8"
  },
  {
    "subCategory": "",
    "title": "狂賭之淵 9",
    "genre": "",
    "id": "kakegurui-9",
    "coverUrl": "",
    "author": "河本焰/尚村透",
    "type": "series",
    "tags": [],
    "category": "狂賭之淵"
  },
  {
    "category": "狂賭之淵",
    "tags": [],
    "type": "series",
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "id": "kakegurui-10",
    "genre": "",
    "subCategory": "",
    "title": "狂賭之淵 10"
  },
  {
    "subCategory": "",
    "title": "狂賭之淵 11",
    "genre": "",
    "id": "kakegurui-11",
    "coverUrl": "",
    "author": "河本焰/尚村透",
    "tags": [],
    "category": "狂賭之淵",
    "type": "series"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "狂賭之淵 12",
    "id": "kakegurui-12",
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "tags": [],
    "category": "狂賭之淵",
    "type": "series"
  },
  {
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "type": "series",
    "tags": [],
    "category": "狂賭之淵",
    "genre": "",
    "title": "狂賭之淵 13",
    "subCategory": "",
    "id": "kakegurui-13"
  },
  {
    "id": "kakegurui-14",
    "genre": "",
    "title": "狂賭之淵 14",
    "subCategory": "",
    "tags": [],
    "category": "狂賭之淵",
    "type": "series",
    "author": "河本焰/尚村透",
    "coverUrl": ""
  },
  {
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "type": "series",
    "category": "狂賭之淵",
    "tags": [],
    "genre": "",
    "subCategory": "",
    "title": "狂賭之淵 15",
    "id": "kakegurui-15"
  },
  {
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "tags": [],
    "category": "狂賭之淵",
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "狂賭之淵 16",
    "id": "kakegurui-16"
  },
  {
    "coverUrl": "",
    "author": "河本焰/尚村透",
    "tags": [],
    "category": "狂賭之淵",
    "type": "series",
    "subCategory": "",
    "title": "狂賭之淵 17",
    "genre": "",
    "id": "kakegurui-17"
  },
  {
    "tags": [],
    "category": "狂賭之淵",
    "type": "series",
    "author": "河本焰/尚村透",
    "coverUrl": "",
    "id": "kakegurui-18",
    "genre": "",
    "subCategory": "",
    "title": "狂賭之淵 18"
  },
  {
    "category": "妖精的尾巴 百年任務",
    "tags": [],
    "type": "series",
    "author": "真島浩/上田敦夫",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551001/KD1551001.jpg",
    "id": "fairy-tail-100-1",
    "genre": "",
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 1"
  },
  {
    "id": "fairy-tail-100-2",
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 2",
    "genre": "",
    "category": "妖精的尾巴 百年任務",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551002/KD1551002.jpg",
    "author": "真島浩/上田敦夫"
  },
  {
    "type": "series",
    "tags": [],
    "category": "妖精的尾巴 百年任務",
    "author": "真島浩/上田敦夫",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551003/KD1551003.jpg",
    "id": "fairy-tail-100-3",
    "genre": "",
    "title": "妖精的尾巴 百年任務 3",
    "subCategory": ""
  },
  {
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 4",
    "genre": "",
    "id": "fairy-tail-100-4",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551004/KD1551004.jpg",
    "author": "真島浩/上田敦夫",
    "tags": [],
    "category": "妖精的尾巴 百年任務",
    "type": "series"
  },
  {
    "id": "fairy-tail-100-5",
    "genre": "",
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 5",
    "tags": [],
    "category": "妖精的尾巴 百年任務",
    "type": "series",
    "author": "真島浩/上田敦夫",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551005/KD1551005.jpg"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 6",
    "id": "fairy-tail-100-6",
    "author": "真島浩/上田敦夫",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551006/KD1551006.jpg",
    "type": "series",
    "category": "妖精的尾巴 百年任務",
    "tags": []
  },
  {
    "type": "series",
    "category": "妖精的尾巴 百年任務",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551007/KD1551007.jpg",
    "author": "真島浩/上田敦夫",
    "id": "fairy-tail-100-7",
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 7",
    "genre": ""
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551008/KD1551008.jpg",
    "author": "真島浩/上田敦夫",
    "type": "series",
    "category": "妖精的尾巴 百年任務",
    "tags": [],
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 8",
    "genre": "",
    "id": "fairy-tail-100-8"
  },
  {
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 9",
    "genre": "",
    "id": "fairy-tail-100-9",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551009/KD1551009.jpg",
    "author": "真島浩/上田敦夫",
    "type": "series",
    "tags": [],
    "category": "妖精的尾巴 百年任務"
  },
  {
    "tags": [],
    "category": "妖精的尾巴 百年任務",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551010/KD1551010.jpg",
    "author": "真島浩/上田敦夫",
    "id": "fairy-tail-100-10",
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 10",
    "genre": ""
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551011/KD1551011.jpg",
    "author": "真島浩/上田敦夫",
    "category": "妖精的尾巴 百年任務",
    "tags": [],
    "type": "series",
    "title": "妖精的尾巴 百年任務 11",
    "subCategory": "",
    "genre": "",
    "id": "fairy-tail-100-11"
  },
  {
    "title": "妖精的尾巴 百年任務 12",
    "subCategory": "",
    "genre": "",
    "id": "fairy-tail-100-12",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551012/KD1551012.jpg",
    "author": "真島浩/上田敦夫",
    "type": "series",
    "tags": [],
    "category": "妖精的尾巴 百年任務"
  },
  {
    "type": "series",
    "tags": [],
    "category": "妖精的尾巴 百年任務",
    "author": "真島浩/上田敦夫",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551013/KD1551013.jpg",
    "id": "fairy-tail-100-13",
    "genre": "",
    "title": "妖精的尾巴 百年任務 13",
    "subCategory": ""
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551014/KD1551014.jpg",
    "author": "真島浩/上田敦夫",
    "tags": [],
    "category": "妖精的尾巴 百年任務",
    "type": "series",
    "subCategory": "",
    "title": "妖精的尾巴 百年任務 14",
    "genre": "",
    "id": "fairy-tail-100-14"
  },
  {
    "type": "series",
    "tags": [],
    "category": "妖精的尾巴 百年任務",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551015/KD1551015.jpg",
    "author": "真島浩/上田敦夫",
    "id": "fairy-tail-100-15",
    "title": "妖精的尾巴 百年任務 15",
    "subCategory": "",
    "genre": ""
  },
  {
    "author": "真島浩/上田敦夫",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1551/KD1551016/KD1551016.jpg",
    "type": "series",
    "tags": [],
    "category": "妖精的尾巴 百年任務",
    "genre": "",
    "title": "妖精的尾巴 百年任務 16",
    "subCategory": "",
    "id": "fairy-tail-100-16"
  },
  {
    "id": "eternity-1",
    "subCategory": "",
    "title": "給不滅的你 1",
    "genre": "",
    "tags": [],
    "category": "給不滅的你",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399001A/KD1399001A.jpg",
    "author": "大今良時"
  },
  {
    "id": "eternity-2",
    "genre": "",
    "title": "給不滅的你 2",
    "subCategory": "",
    "type": "series",
    "tags": [],
    "category": "給不滅的你",
    "author": "大今良時",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399002A/KD1399002A.jpg"
  },
  {
    "subCategory": "",
    "title": "給不滅的你 3",
    "genre": "",
    "id": "eternity-3",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399003A/KD1399003A.jpg",
    "author": "大今良時",
    "type": "series",
    "tags": [],
    "category": "給不滅的你"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399004A/KD1399004A.jpg",
    "author": "大今良時",
    "tags": [],
    "category": "給不滅的你",
    "type": "series",
    "subCategory": "",
    "title": "給不滅的你 4",
    "genre": "",
    "id": "eternity-4"
  },
  {
    "id": "eternity-5",
    "genre": "",
    "subCategory": "",
    "title": "給不滅的你 5",
    "type": "series",
    "tags": [],
    "category": "給不滅的你",
    "author": "大今良時",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399005A/KD1399005A.jpg"
  },
  {
    "id": "eternity-6",
    "subCategory": "",
    "title": "給不滅的你 6",
    "genre": "",
    "category": "給不滅的你",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399006A/KD1399006A.jpg",
    "author": "大今良時"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "給不滅的你 7",
    "id": "eternity-7",
    "author": "大今良時",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399007A/KD1399007A.jpg",
    "category": "給不滅的你",
    "tags": [],
    "type": "series"
  },
  {
    "title": "給不滅的你 8",
    "subCategory": "",
    "genre": "",
    "id": "eternity-8",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399008A/KD1399008A.jpg",
    "author": "大今良時",
    "type": "series",
    "tags": [],
    "category": "給不滅的你"
  },
  {
    "tags": [],
    "category": "給不滅的你",
    "type": "series",
    "author": "大今良時",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399009A/KD1399009A.jpg",
    "id": "eternity-9",
    "genre": "",
    "title": "給不滅的你 9",
    "subCategory": ""
  },
  {
    "type": "series",
    "category": "給不滅的你",
    "tags": [],
    "author": "大今良時",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399010A/KD1399010A.jpg",
    "id": "eternity-10",
    "genre": "",
    "title": "給不滅的你 10",
    "subCategory": ""
  },
  {
    "category": "給不滅的你",
    "tags": [],
    "type": "series",
    "author": "大今良時",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399011A/KD1399011A.jpg",
    "id": "eternity-11",
    "genre": "",
    "subCategory": "",
    "title": "給不滅的你 11"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399012/KD1399012.jpg",
    "author": "大今良時",
    "type": "series",
    "category": "給不滅的你",
    "tags": [],
    "title": "給不滅的你 12",
    "subCategory": "",
    "genre": "",
    "id": "eternity-12"
  },
  {
    "tags": [],
    "category": "給不滅的你",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399013/KD1399013.jpg",
    "author": "大今良時",
    "id": "eternity-13",
    "subCategory": "",
    "title": "給不滅的你 13",
    "genre": ""
  },
  {
    "author": "大今良時",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399014/KD1399014.jpg",
    "category": "給不滅的你",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "給不滅的你 14",
    "id": "eternity-14"
  },
  {
    "author": "大今良時",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399015/KD1399015.jpg",
    "category": "給不滅的你",
    "tags": [],
    "type": "series",
    "genre": "",
    "title": "給不滅的你 15",
    "subCategory": "",
    "id": "eternity-15"
  },
  {
    "subCategory": "",
    "title": "給不滅的你 16",
    "genre": "",
    "id": "eternity-16",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399016/KD1399016.jpg",
    "author": "大今良時",
    "category": "給不滅的你",
    "tags": [],
    "type": "series"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1399/KD1399017/KD1399017.jpg",
    "author": "大今良時",
    "type": "series",
    "tags": [],
    "category": "給不滅的你",
    "subCategory": "",
    "title": "給不滅的你 17",
    "genre": "",
    "id": "eternity-17"
  },
  {
    "id": "chainsaw-1",
    "subCategory": "",
    "title": "鏈鋸人 1",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "鏈鋸人",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146001/JC1146001.jpg",
    "author": "藤本樹"
  },
  {
    "author": "藤本樹",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146002/JC1146002.jpg",
    "tags": [],
    "category": "鏈鋸人",
    "type": "series",
    "genre": "",
    "title": "鏈鋸人 2",
    "subCategory": "",
    "id": "chainsaw-2"
  },
  {
    "subCategory": "",
    "title": "鏈鋸人 3",
    "genre": "",
    "id": "chainsaw-3",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146003/JC1146003.jpg",
    "author": "藤本樹",
    "type": "series",
    "tags": [],
    "category": "鏈鋸人"
  },
  {
    "author": "藤本樹",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146004/JC1146004.jpg",
    "type": "series",
    "tags": [],
    "category": "鏈鋸人",
    "genre": "",
    "subCategory": "",
    "title": "鏈鋸人 4",
    "id": "chainsaw-4"
  },
  {
    "type": "series",
    "tags": [],
    "category": "鏈鋸人",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146005/JC1146005.jpg",
    "author": "藤本樹",
    "id": "chainsaw-5",
    "subCategory": "",
    "title": "鏈鋸人 5",
    "genre": ""
  },
  {
    "author": "藤本樹",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146006/JC1146006.jpg",
    "tags": [],
    "category": "鏈鋸人",
    "type": "series",
    "genre": "",
    "title": "鏈鋸人 6",
    "subCategory": "",
    "id": "chainsaw-6"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146007/JC1146007.jpg",
    "author": "藤本樹",
    "category": "鏈鋸人",
    "tags": [],
    "type": "series",
    "subCategory": "",
    "title": "鏈鋸人 7",
    "genre": "",
    "id": "chainsaw-7"
  },
  {
    "author": "藤本樹",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146008/JC1146008.jpg",
    "tags": [],
    "category": "鏈鋸人",
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "鏈鋸人 8",
    "id": "chainsaw-8"
  },
  {
    "id": "chainsaw-9",
    "genre": "",
    "subCategory": "",
    "title": "鏈鋸人 9",
    "category": "鏈鋸人",
    "tags": [],
    "type": "series",
    "author": "藤本樹",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146009/JC1146009.jpg"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "鏈鋸人 10",
    "id": "chainsaw-10",
    "author": "藤本樹",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146010/JC1146010.jpg",
    "category": "鏈鋸人",
    "tags": [],
    "type": "series"
  },
  {
    "author": "藤本樹",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1146/JC1146011/JC1146011.jpg",
    "tags": [],
    "category": "鏈鋸人",
    "type": "series",
    "genre": "",
    "title": "鏈鋸人 11",
    "subCategory": "",
    "id": "chainsaw-11"
  },
  {
    "id": "ender-geister-1",
    "subCategory": "",
    "title": "終之退魔師 1",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "終之退魔師",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10366981/0/638892407642800000?v=1",
    "author": "四方山 貴史"
  },
  {
    "id": "ender-geister-2",
    "genre": "",
    "title": "終之退魔師 2",
    "subCategory": "",
    "tags": [],
    "category": "終之退魔師",
    "type": "series",
    "author": "四方山 貴史",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10488971/0/638814367380630000?v=1"
  },
  {
    "genre": "",
    "title": "終之退魔師 3",
    "subCategory": "",
    "id": "ender-geister-3",
    "author": "四方山 貴史",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10567362/0/638892407635470000?v=1",
    "tags": [],
    "category": "終之退魔師",
    "type": "series"
  },
  {
    "author": "天樹征丸/佐藤文也",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD0494/KD0494001/KD0494001.jpg",
    "type": "series",
    "tags": [],
    "category": "金田一少年事件簿R",
    "genre": "",
    "subCategory": "",
    "title": "金田一少年事件簿R 1",
    "id": "kindaichi-r-1"
  },
  {
    "author": "天樹征丸/佐藤文也",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD0494/KD0494002/KD0494002.jpg",
    "type": "series",
    "category": "金田一少年事件簿R",
    "tags": [],
    "genre": "",
    "title": "金田一少年事件簿R 2",
    "subCategory": "",
    "id": "kindaichi-r-2"
  },
  {
    "tags": [],
    "category": "金田一少年事件簿R",
    "type": "series",
    "author": "天樹征丸/佐藤文也",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD0494/KD0494003/KD0494003.jpg",
    "id": "kindaichi-r-3",
    "genre": "",
    "subCategory": "",
    "title": "金田一少年事件簿R 3"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "金田一少年事件簿R 4",
    "id": "kindaichi-r-4",
    "author": "天樹征丸/佐藤文也",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD0494/KD0494004/KD0494004.jpg",
    "type": "series",
    "category": "金田一少年事件簿R",
    "tags": []
  },
  {
    "type": "series",
    "category": "金田一少年事件簿R",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD0494/KD0494005/KD0494005.jpg",
    "author": "天樹征丸/佐藤文也",
    "id": "kindaichi-r-5",
    "title": "金田一少年事件簿R 5",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "kindaichi-r-6",
    "title": "金田一少年事件簿R 6",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "金田一少年事件簿R",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD0494/KD0494006/KD0494006.jpg",
    "author": "天樹征丸/佐藤文也"
  },
  {
    "title": "金田一少年事件簿R 7",
    "subCategory": "",
    "genre": "",
    "id": "kindaichi-r-7",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD0494/KD0494007/KD0494007.jpg",
    "author": "天樹征丸/佐藤文也",
    "tags": [],
    "category": "金田一少年事件簿R",
    "type": "series"
  },
  {
    "id": "cuckoo-1",
    "genre": "",
    "subCategory": "",
    "title": "杜鵑婚約 1",
    "type": "series",
    "tags": [],
    "category": "杜鵑婚約",
    "author": "吉河美希",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1630/KD1630001/KD1630001.jpg"
  },
  {
    "id": "cuckoo-2",
    "genre": "",
    "title": "杜鵑婚約 2",
    "subCategory": "",
    "category": "杜鵑婚約",
    "tags": [],
    "type": "series",
    "author": "吉河美希",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1630/KD1630002/KD1630002.jpg"
  },
  {
    "tags": [],
    "category": "明日同學的水手服",
    "type": "series",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681682046005/20190422115211730233.jpg",
    "author": "博",
    "id": "akebi-1",
    "subCategory": "",
    "title": "明日同學的水手服 1",
    "genre": ""
  },
  {
    "id": "akebi-2",
    "subCategory": "",
    "title": "明日同學的水手服 2",
    "genre": "",
    "tags": [],
    "category": "明日同學的水手服",
    "type": "series",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681770740006/20190628164517864277.jpg",
    "author": "博"
  },
  {
    "id": "akebi-3",
    "genre": "",
    "subCategory": "",
    "title": "明日同學的水手服 3",
    "tags": [],
    "category": "明日同學的水手服",
    "type": "series",
    "author": "博",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681798679005/20190821044938477502.jpg"
  },
  {
    "category": "明日同學的水手服",
    "tags": [],
    "type": "series",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681825025003/20191102052832689736.jpg",
    "author": "博",
    "id": "akebi-4",
    "title": "明日同學的水手服 4",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "akebi-5",
    "title": "明日同學的水手服 5",
    "subCategory": "",
    "genre": "",
    "category": "明日同學的水手服",
    "tags": [],
    "type": "series",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681848986008/20200109033552962374.jpg",
    "author": "博"
  },
  {
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681894010009/20200701053108668003.jpg",
    "author": "博",
    "category": "明日同學的水手服",
    "tags": [],
    "type": "series",
    "subCategory": "",
    "title": "明日同學的水手服 6",
    "genre": "",
    "id": "akebi-6"
  },
  {
    "id": "akebi-7",
    "genre": "",
    "subCategory": "",
    "title": "明日同學的水手服 7",
    "tags": [],
    "category": "明日同學的水手服",
    "type": "series",
    "author": "博",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681991549006/20210316054822146774.jpg"
  },
  {
    "author": "博",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682159959002/20220414060610889737.jpg",
    "category": "明日同學的水手服",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "明日同學的水手服 8",
    "id": "akebi-8"
  },
  {
    "subCategory": "",
    "title": "女神咖啡廳 1",
    "genre": "",
    "id": "goddess-cafe-1",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1688/KD1688001/KD1688001.jpg",
    "author": "瀨尾公治",
    "category": "女神咖啡廳",
    "type": "series"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1688/KD1688002/KD1688002.jpg",
    "author": "瀨尾公治",
    "category": "女神咖啡廳",
    "type": "series",
    "title": "女神咖啡廳 2",
    "subCategory": "",
    "genre": "",
    "id": "goddess-cafe-2"
  },
  {
    "category": "女神咖啡廳",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1688/KD1688003/KD1688003.jpg",
    "author": "瀨尾公治",
    "id": "goddess-cafe-3",
    "title": "女神咖啡廳 3",
    "subCategory": "",
    "genre": ""
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "女神咖啡廳 4",
    "id": "goddess-cafe-4",
    "author": "瀨尾公治",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1688/KD1688004/KD1688004.jpg",
    "type": "series",
    "category": "女神咖啡廳"
  },
  {
    "author": "瀨尾公治",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1688/KD1688005/KD1688005.jpg",
    "type": "series",
    "category": "女神咖啡廳",
    "genre": "",
    "title": "女神咖啡廳 5",
    "subCategory": "",
    "id": "goddess-cafe-5"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "不要欺負我，長瀞同學 1",
    "id": "nagatoro-1",
    "author": "Nanashi",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494001/KD1494001.jpg",
    "type": "series",
    "category": "不要欺負我，長瀞同學"
  },
  {
    "type": "series",
    "category": "不要欺負我，長瀞同學",
    "author": "Nanashi",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494002/KD1494002.jpg",
    "id": "nagatoro-2",
    "genre": "",
    "title": "不要欺負我，長瀞同學 2",
    "subCategory": ""
  },
  {
    "author": "Nanashi",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494003/KD1494003.jpg",
    "type": "series",
    "category": "不要欺負我，長瀞同學",
    "genre": "",
    "subCategory": "",
    "title": "不要欺負我，長瀞同學 3",
    "id": "nagatoro-3"
  },
  {
    "title": "不要欺負我，長瀞同學 4",
    "subCategory": "",
    "genre": "",
    "id": "nagatoro-4",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494004/KD1494004.jpg",
    "author": "Nanashi",
    "type": "series",
    "category": "不要欺負我，長瀞同學"
  },
  {
    "genre": "",
    "title": "不要欺負我，長瀞同學 5",
    "subCategory": "",
    "id": "nagatoro-5",
    "author": "Nanashi",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494005/KD1494005.jpg",
    "category": "不要欺負我，長瀞同學",
    "type": "series"
  },
  {
    "author": "Nanashi",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494006/KD1494006.jpg",
    "type": "series",
    "category": "不要欺負我，長瀞同學",
    "genre": "",
    "title": "不要欺負我，長瀞同學 6",
    "subCategory": "",
    "id": "nagatoro-6"
  },
  {
    "id": "nagatoro-7",
    "title": "不要欺負我，長瀞同學 7",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "category": "不要欺負我，長瀞同學",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494007/KD1494007.jpg",
    "author": "Nanashi"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494008/KD1494008.jpg",
    "author": "Nanashi",
    "type": "series",
    "category": "不要欺負我，長瀞同學",
    "title": "不要欺負我，長瀞同學 8",
    "subCategory": "",
    "genre": "",
    "id": "nagatoro-8"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494009/KD1494009.jpg",
    "author": "Nanashi",
    "category": "不要欺負我，長瀞同學",
    "type": "series",
    "title": "不要欺負我，長瀞同學 9",
    "subCategory": "",
    "genre": "",
    "id": "nagatoro-9"
  },
  {
    "author": "Nanashi",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494010/KD1494010.jpg",
    "type": "series",
    "category": "不要欺負我，長瀞同學",
    "genre": "",
    "subCategory": "",
    "title": "不要欺負我，長瀞同學 10",
    "id": "nagatoro-10"
  },
  {
    "author": "Nanashi",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494011A/KD1494011A.jpg",
    "category": "不要欺負我，長瀞同學",
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "不要欺負我，長瀞同學 11",
    "id": "nagatoro-11"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494012/KD1494012.jpg",
    "author": "Nanashi",
    "type": "series",
    "category": "不要欺負我，長瀞同學",
    "subCategory": "",
    "title": "不要欺負我，長瀞同學 12",
    "genre": "",
    "id": "nagatoro-12"
  },
  {
    "type": "series",
    "category": "不要欺負我，長瀞同學",
    "author": "Nanashi",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494013/KD1494013.jpg",
    "id": "nagatoro-13",
    "genre": "",
    "title": "不要欺負我，長瀞同學 13",
    "subCategory": ""
  },
  {
    "type": "series",
    "category": "不要欺負我，長瀞同學",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494014/KD1494014.jpg",
    "author": "Nanashi",
    "id": "nagatoro-14",
    "title": "不要欺負我，長瀞同學 14",
    "subCategory": "",
    "genre": ""
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "不要欺負我，長瀞同學 15",
    "id": "nagatoro-15",
    "author": "Nanashi",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494015/KD1494015.jpg",
    "category": "不要欺負我，長瀞同學",
    "type": "series"
  },
  {
    "id": "nagatoro-16",
    "subCategory": "",
    "title": "不要欺負我，長瀞同學 16",
    "genre": "",
    "category": "不要欺負我，長瀞同學",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1494/KD1494016/KD1494016.jpg",
    "author": "Nanashi"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1200/JC1200001/JC1200001.jpg",
    "author": "雪森寧寧",
    "tags": [],
    "category": "久保同學不放過我",
    "type": "series",
    "subCategory": "",
    "title": "久保同學不放過我 1",
    "genre": "",
    "id": "kubo-1"
  },
  {
    "type": "series",
    "category": "久保同學不放過我",
    "tags": [],
    "author": "雪森寧寧",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1200/JC1200002/JC1200002.jpg",
    "id": "kubo-2",
    "genre": "",
    "title": "久保同學不放過我 2",
    "subCategory": ""
  },
  {
    "author": "雪森寧寧",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1200/JC1200003/JC1200003.jpg",
    "type": "series",
    "tags": [],
    "category": "久保同學不放過我",
    "genre": "",
    "title": "久保同學不放過我 3",
    "subCategory": "",
    "id": "kubo-3"
  },
  {
    "id": "senpai-boy-1",
    "genre": "",
    "subCategory": "",
    "title": "學姊是男孩 1",
    "tags": [],
    "category": "學姊是男孩",
    "type": "series",
    "author": "ぽむ",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/BM0413/BM0413001/BM0413001.jpg"
  },
  {
    "id": "senpai-boy-2",
    "title": "學姊是男孩 2",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "category": "學姊是男孩",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/BM0413/BM0413002/BM0413002.jpg",
    "author": "ぽむ"
  },
  {
    "type": "series",
    "category": "出租女友",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552001/KD1552001.jpg",
    "author": "宮島禮吏",
    "id": "rent-gf-1",
    "title": "出租女友 1",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "rent-gf-2",
    "genre": "",
    "title": "出租女友 2",
    "subCategory": "",
    "type": "series",
    "tags": [],
    "category": "出租女友",
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552002/KD1552002.jpg"
  },
  {
    "title": "出租女友 3",
    "subCategory": "",
    "genre": "",
    "id": "rent-gf-3",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552003/KD1552003.jpg",
    "author": "宮島禮吏",
    "tags": [],
    "category": "出租女友",
    "type": "series"
  },
  {
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552004/KD1552004.jpg",
    "tags": [],
    "category": "出租女友",
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "出租女友 4",
    "id": "rent-gf-4"
  },
  {
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552005/KD1552005.jpg",
    "category": "出租女友",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "出租女友 5",
    "id": "rent-gf-5"
  },
  {
    "genre": "",
    "title": "出租女友 6",
    "subCategory": "",
    "id": "rent-gf-6",
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552006/KD1552006.jpg",
    "category": "出租女友",
    "tags": [],
    "type": "series"
  },
  {
    "genre": "",
    "title": "出租女友 10",
    "subCategory": "",
    "id": "rent-gf-10",
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552010/KD1552010.jpg",
    "category": "出租女友",
    "tags": [],
    "type": "series"
  },
  {
    "type": "series",
    "tags": [],
    "category": "出租女友",
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552011/KD1552011.jpg",
    "id": "rent-gf-11",
    "genre": "",
    "title": "出租女友 11",
    "subCategory": ""
  },
  {
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552022/KD1552022.jpg",
    "tags": [],
    "category": "出租女友",
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "出租女友 22",
    "id": "rent-gf-22"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "出租女友 23",
    "id": "rent-gf-23",
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552023/KD1552023.jpg",
    "category": "出租女友",
    "tags": [],
    "type": "series"
  },
  {
    "tags": [],
    "category": "出租女友",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552024/KD1552024.jpg",
    "author": "宮島禮吏",
    "id": "rent-gf-24",
    "title": "出租女友 24",
    "subCategory": "",
    "genre": ""
  },
  {
    "category": "出租女友",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552025/KD1552025.jpg",
    "author": "宮島禮吏",
    "id": "rent-gf-25",
    "subCategory": "",
    "title": "出租女友 25",
    "genre": ""
  },
  {
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552026/KD1552026.jpg",
    "category": "出租女友",
    "tags": [],
    "type": "series",
    "genre": "",
    "title": "出租女友 26",
    "subCategory": "",
    "id": "rent-gf-26"
  },
  {
    "category": "出租女友",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552027/KD1552027.jpg",
    "author": "宮島禮吏",
    "id": "rent-gf-27",
    "subCategory": "",
    "title": "出租女友 27",
    "genre": ""
  },
  {
    "type": "series",
    "category": "出租女友",
    "tags": [],
    "author": "宮島禮吏",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1552/KD1552028/KD1552028.jpg",
    "id": "rent-gf-28",
    "genre": "",
    "subCategory": "",
    "title": "出租女友 28"
  },
  {
    "id": "kagura-1",
    "genre": "",
    "title": "神樂鉢 1",
    "subCategory": "",
    "type": "series",
    "tags": [],
    "category": "神樂鉢",
    "author": "外薗健",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1343/JC1343001/JC1343001.jpg"
  },
  {
    "tags": [],
    "category": "神樂鉢",
    "type": "series",
    "author": "外薗健",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1343/JC1343002/JC1343002.jpg",
    "id": "kagura-2",
    "genre": "",
    "title": "神樂鉢 2",
    "subCategory": ""
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1343/JC1343003/JC1343003.jpg",
    "author": "外薗健",
    "tags": [],
    "category": "神樂鉢",
    "type": "series",
    "subCategory": "",
    "title": "神樂鉢 3",
    "genre": "",
    "id": "kagura-3"
  },
  {
    "type": "series",
    "category": "神樂鉢",
    "tags": [],
    "author": "外薗健",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1343/JC1343004/JC1343004.jpg",
    "id": "kagura-4",
    "genre": "",
    "subCategory": "",
    "title": "神樂鉢 4"
  },
  {
    "type": "series",
    "tags": [],
    "category": "神樂鉢",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1343/JC1343005/JC1343005.jpg",
    "author": "外薗健",
    "id": "kagura-5",
    "title": "神樂鉢 5",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "kagura-6",
    "genre": "",
    "subCategory": "",
    "title": "神樂鉢 6",
    "type": "series",
    "category": "神樂鉢",
    "author": "外薗健",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1343/JC1343006/JC1343006.jpg"
  },
  {
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10536446/0/638811730968200000?v=1",
    "author": "五十嵐正邦",
    "type": "series",
    "category": "午夜的傾心旋律",
    "tags": [],
    "title": "午夜的傾心旋律 1",
    "subCategory": "",
    "genre": "",
    "id": "midnight-1"
  },
  {
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10661989/0/638823809979470000?v=1",
    "author": "五十嵐正邦",
    "type": "series",
    "category": "午夜的傾心旋律",
    "tags": [],
    "subCategory": "",
    "title": "午夜的傾心旋律 2",
    "genre": "",
    "id": "midnight-2"
  },
  {
    "category": "午夜的傾心旋律",
    "tags": [],
    "type": "series",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10793138/0/638840312429970000?v=1",
    "author": "五十嵐正邦",
    "id": "midnight-3",
    "subCategory": "",
    "title": "午夜的傾心旋律 3",
    "genre": ""
  },
  {
    "author": "五十嵐正邦",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10937888/0/638876559761470000?v=1",
    "category": "午夜的傾心旋律",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "午夜的傾心旋律 4",
    "id": "midnight-4"
  },
  {
    "id": "midnight-5",
    "genre": "",
    "title": "午夜的傾心旋律 5",
    "subCategory": "",
    "type": "series",
    "category": "午夜的傾心旋律",
    "tags": [],
    "author": "五十嵐正邦",
    "coverUrl": ""
  },
  {
    "author": "五十嵐正邦",
    "coverUrl": "",
    "type": "series",
    "category": "午夜的傾心旋律",
    "tags": [],
    "genre": "",
    "title": "午夜的傾心旋律 6",
    "subCategory": "",
    "id": "midnight-6"
  },
  {
    "genre": "",
    "title": "來自深淵 1",
    "subCategory": "",
    "id": "abyss-manga-1",
    "author": "土筆章人",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681479515004/702742.jpg",
    "type": "series",
    "tags": [],
    "category": "來自深淵"
  },
  {
    "category": "來自深淵",
    "tags": [],
    "type": "series",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681479517008/702740.jpg",
    "author": "土筆章人",
    "id": "abyss-manga-2",
    "title": "來自深淵 2",
    "subCategory": "",
    "genre": ""
  },
  {
    "subCategory": "",
    "title": "來自深淵 3",
    "genre": "",
    "id": "abyss-manga-3",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681488480003/709718.jpg",
    "author": "土筆章人",
    "category": "來自深淵",
    "tags": [],
    "type": "series"
  },
  {
    "id": "abyss-manga-4",
    "genre": "",
    "title": "來自深淵 4",
    "subCategory": "",
    "category": "來自深淵",
    "tags": [],
    "type": "series",
    "author": "土筆章人",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681501890000/718620.jpg"
  },
  {
    "subCategory": "",
    "title": "來自深淵 5",
    "genre": "",
    "id": "abyss-manga-5",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681513177007/726581.jpg",
    "author": "土筆章人",
    "type": "series",
    "category": "來自深淵",
    "tags": []
  },
  {
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681533051004/742501.jpg",
    "author": "土筆章人",
    "type": "series",
    "category": "來自深淵",
    "tags": [],
    "subCategory": "",
    "title": "來自深淵 6",
    "genre": "",
    "id": "abyss-manga-6"
  },
  {
    "id": "abyss-manga-7",
    "genre": "",
    "subCategory": "",
    "title": "來自深淵 7",
    "tags": [],
    "category": "來自深淵",
    "type": "series",
    "author": "土筆章人",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681707834006/ec1649659.jpg"
  },
  {
    "author": "土筆章人",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681853357008/20200123032419944616.jpg",
    "type": "series",
    "tags": [],
    "category": "來自深淵",
    "genre": "",
    "title": "來自深淵 8",
    "subCategory": "",
    "id": "abyss-manga-8"
  },
  {
    "type": "series",
    "tags": [],
    "category": "來自深淵",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2681975418007/20210126033700976857.jpg",
    "author": "土筆章人",
    "id": "abyss-manga-9",
    "title": "來自深淵 9",
    "subCategory": "",
    "genre": ""
  },
  {
    "author": "土筆章人",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682122210000/20220114040139486940.jpg",
    "category": "來自深淵",
    "tags": [],
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "來自深淵 10",
    "id": "abyss-manga-10"
  },
  {
    "genre": "",
    "title": "來自深淵 11",
    "subCategory": "",
    "id": "abyss-manga-11",
    "author": "土筆章人",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682325977007/20230110041046291139.jpg",
    "tags": [],
    "category": "來自深淵",
    "type": "series"
  },
  {
    "id": "abyss-manga-12",
    "genre": "",
    "subCategory": "",
    "title": "來自深淵 12",
    "type": "series",
    "category": "來自深淵",
    "tags": [],
    "author": "土筆章人",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/vendor/vendor172017708664820240705185809/mainCoverImage1_1284340.jpg"
  },
  {
    "title": "來自深淵 13",
    "subCategory": "",
    "genre": "",
    "id": "abyss-manga-13",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/vendor/vendor175271991661020250717103838/mainCoverImage1_1478251.jpg",
    "author": "土筆章人",
    "tags": [],
    "category": "來自深淵",
    "type": "series"
  },
  {
    "id": "ririsa-1",
    "subCategory": "",
    "title": "2.5次元的誘惑 1",
    "genre": "",
    "tags": [],
    "category": "2.5次元的誘惑",
    "type": "series",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518901.jpg",
    "author": "橋本悠"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "2.5次元的誘惑 2",
    "id": "ririsa-2",
    "author": "橋本悠",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518902.jpg",
    "tags": [],
    "category": "2.5次元的誘惑",
    "type": "series"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "2.5次元的誘惑 3",
    "id": "ririsa-3",
    "author": "橋本悠",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518903.jpg",
    "type": "series",
    "tags": [],
    "category": "2.5次元的誘惑"
  },
  {
    "subCategory": "",
    "title": "2.5次元的誘惑 4",
    "genre": "",
    "id": "ririsa-4",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518904.jpg",
    "author": "橋本悠",
    "category": "2.5次元的誘惑",
    "tags": [],
    "type": "series"
  },
  {
    "id": "ririsa-5",
    "subCategory": "",
    "title": "2.5次元的誘惑 5",
    "genre": "",
    "tags": [],
    "category": "2.5次元的誘惑",
    "type": "series",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518905.jpg",
    "author": "橋本悠"
  },
  {
    "subCategory": "",
    "title": "2.5次元的誘惑 6",
    "genre": "",
    "id": "ririsa-6",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518906.jpg",
    "author": "橋本悠",
    "type": "series",
    "tags": [],
    "category": "2.5次元的誘惑"
  },
  {
    "genre": "",
    "title": "2.5次元的誘惑 7",
    "subCategory": "",
    "id": "ririsa-7",
    "author": "橋本悠",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518907.jpg",
    "type": "series",
    "tags": [],
    "category": "2.5次元的誘惑"
  },
  {
    "type": "series",
    "tags": [],
    "category": "2.5次元的誘惑",
    "author": "橋本悠",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518908.jpg",
    "id": "ririsa-8",
    "genre": "",
    "title": "2.5次元的誘惑 8",
    "subCategory": ""
  },
  {
    "id": "ririsa-9",
    "subCategory": "",
    "title": "2.5次元的誘惑 9",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "2.5次元的誘惑",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518909.jpg",
    "author": "橋本悠"
  },
  {
    "subCategory": "",
    "title": "2.5次元的誘惑 10",
    "genre": "",
    "id": "ririsa-10",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518910.jpg",
    "author": "橋本悠",
    "tags": [],
    "category": "2.5次元的誘惑",
    "type": "series"
  },
  {
    "category": "2.5次元的誘惑",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518911.jpg",
    "author": "橋本悠",
    "id": "ririsa-11",
    "title": "2.5次元的誘惑 11",
    "subCategory": "",
    "genre": ""
  },
  {
    "type": "series",
    "tags": [],
    "category": "2.5次元的誘惑",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518912.jpg",
    "author": "橋本悠",
    "id": "ririsa-12",
    "title": "2.5次元的誘惑 12",
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "ririsa-13",
    "genre": "",
    "subCategory": "",
    "title": "2.5次元的誘惑 13",
    "type": "series",
    "tags": [],
    "category": "2.5次元的誘惑",
    "author": "橋本悠",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518913.jpg"
  },
  {
    "type": "series",
    "category": "2.5次元的誘惑",
    "tags": [],
    "author": "橋本悠",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518914.jpg",
    "id": "ririsa-14",
    "genre": "",
    "title": "2.5次元的誘惑 14",
    "subCategory": ""
  },
  {
    "author": "橋本悠",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518915.jpg",
    "tags": [],
    "category": "2.5次元的誘惑",
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "2.5次元的誘惑 15",
    "id": "ririsa-15"
  },
  {
    "id": "ririsa-16",
    "genre": "",
    "title": "2.5次元的誘惑 16",
    "subCategory": "",
    "type": "series",
    "category": "2.5次元的誘惑",
    "tags": [],
    "author": "橋本悠",
    "coverUrl": "https://www.ching-win.com.tw//upload_files/fonlego-rwd/prodpic/D_10518916.jpg"
  },
  {
    "title": "2.5次元的誘惑 17",
    "subCategory": "",
    "genre": "",
    "id": "ririsa-17",
    "coverUrl": "",
    "author": "橋本悠",
    "tags": [],
    "category": "2.5次元的誘惑",
    "type": "series"
  },
  {
    "coverUrl": "",
    "author": "橋本悠",
    "category": "2.5次元的誘惑",
    "tags": [],
    "type": "series",
    "title": "2.5次元的誘惑 18",
    "subCategory": "",
    "genre": "",
    "id": "ririsa-18"
  },
  {
    "subCategory": "",
    "title": "結緣甘神神社 1",
    "genre": "",
    "id": "amagami-1",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1706/KD1706001/KD1706001.jpg",
    "author": "內藤Marcey",
    "type": "series",
    "category": "結緣甘神神社",
    "tags": []
  },
  {
    "type": "series",
    "category": "結緣甘神神社",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1706/KD1706002/KD1706002.jpg",
    "author": "內藤Marcey",
    "id": "amagami-2",
    "title": "結緣甘神神社 2",
    "subCategory": "",
    "genre": ""
  },
  {
    "category": "結緣甘神神社",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1706/KD1706003/KD1706003.jpg",
    "author": "內藤Marcey",
    "id": "amagami-3",
    "subCategory": "",
    "title": "結緣甘神神社 3",
    "genre": ""
  },
  {
    "subCategory": "",
    "title": "結緣甘神神社 4",
    "genre": "",
    "id": "amagami-4",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1706/KD1706004/KD1706004.jpg",
    "author": "內藤Marcey",
    "category": "結緣甘神神社",
    "tags": [],
    "type": "series"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1706/KD1706005/KD1706005.jpg",
    "author": "內藤Marcey",
    "type": "series",
    "category": "結緣甘神神社",
    "tags": [],
    "title": "結緣甘神神社 5",
    "subCategory": "",
    "genre": "",
    "id": "amagami-5"
  },
  {
    "id": "amagami-6",
    "genre": "",
    "subCategory": "",
    "title": "結緣甘神神社 6",
    "type": "series",
    "tags": [],
    "category": "結緣甘神神社",
    "author": "內藤Marcey",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1706/KD1706006/KD1706006.jpg"
  },
  {
    "type": "series",
    "tags": [],
    "category": "結緣甘神神社",
    "author": "內藤Marcey",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1706/KD1706007/KD1706007.jpg",
    "id": "amagami-7",
    "genre": "",
    "subCategory": "",
    "title": "結緣甘神神社 7"
  },
  {
    "id": "amagami-8",
    "genre": "",
    "subCategory": "",
    "title": "結緣甘神神社 8",
    "type": "series",
    "tags": [],
    "category": "結緣甘神神社",
    "author": "內藤Marcey",
    "coverUrl": ""
  },
  {
    "author": "門馬司/鹿子",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10239614/0/638681233541600000?v=1",
    "type": "series",
    "category": "滿州鴉片小隊",
    "tags": [],
    "genre": "",
    "subCategory": "",
    "title": "滿州鴉片小隊 1",
    "id": "manchuria-opium-1"
  },
  {
    "subCategory": "",
    "title": "滿州鴉片小隊 2",
    "genre": "",
    "id": "manchuria-opium-2",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10239615/0/638681233556700000?v=1",
    "author": "門馬司/鹿子",
    "tags": [],
    "category": "滿州鴉片小隊",
    "type": "series"
  },
  {
    "title": "滿州鴉片小隊 3",
    "subCategory": "",
    "genre": "",
    "id": "manchuria-opium-3",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10239616/0/638681233558470000?v=1",
    "author": "門馬司/鹿子",
    "type": "series",
    "category": "滿州鴉片小隊",
    "tags": []
  },
  {
    "id": "manchuria-opium-4",
    "genre": "",
    "title": "滿州鴉片小隊 4",
    "subCategory": "",
    "type": "series",
    "tags": [],
    "category": "滿州鴉片小隊",
    "author": "門馬司/鹿子",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10410254/0/638744319591730000?v=1"
  },
  {
    "id": "manchuria-opium-5",
    "title": "滿州鴉片小隊 5",
    "subCategory": "",
    "genre": "",
    "category": "滿州鴉片小隊",
    "tags": [],
    "type": "series",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10410255/0/638744319588400000?v=1",
    "author": "門馬司/鹿子"
  },
  {
    "id": "manchuria-opium-6",
    "genre": "",
    "subCategory": "",
    "title": "滿州鴉片小隊 6",
    "type": "series",
    "tags": [],
    "category": "滿州鴉片小隊",
    "author": "門馬司/鹿子",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10410256/0/638744319590270000?v=1"
  },
  {
    "genre": "",
    "title": "滿州鴉片小隊 7",
    "subCategory": "",
    "id": "manchuria-opium-7",
    "author": "門馬司/鹿子",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10561721/0/638890464257570000?v=1",
    "type": "series",
    "tags": [],
    "category": "滿州鴉片小隊"
  },
  {
    "id": "manchuria-opium-8",
    "genre": "",
    "subCategory": "",
    "title": "滿州鴉片小隊 8",
    "category": "滿州鴉片小隊",
    "tags": [],
    "type": "series",
    "author": "門馬司/鹿子",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10606679/0/638905868173870000?v=1"
  },
  {
    "title": "滿州鴉片小隊 9",
    "subCategory": "",
    "genre": "",
    "id": "manchuria-opium-9",
    "coverUrl": "https://img.91app.com/webapi/imagesV3/Original/SalePage/10606681/0/638905868175330000?v=1",
    "author": "門馬司/鹿子",
    "type": "series",
    "category": "滿州鴉片小隊",
    "tags": []
  },
  {
    "tags": [],
    "category": "滿州鴉片小隊",
    "type": "series",
    "coverUrl": "",
    "author": "門馬司/鹿子",
    "id": "manchuria-opium-10",
    "subCategory": "",
    "title": "滿州鴉片小隊 10",
    "genre": ""
  },
  {
    "id": "manchuria-opium-11",
    "genre": "",
    "subCategory": "",
    "title": "滿州鴉片小隊 11",
    "type": "series",
    "tags": [],
    "category": "滿州鴉片小隊",
    "author": "門馬司/鹿子",
    "coverUrl": ""
  },
  {
    "author": "門馬司/鹿子",
    "coverUrl": "",
    "category": "滿州鴉片小隊",
    "tags": [],
    "type": "series",
    "genre": "",
    "title": "滿州鴉片小隊 12",
    "subCategory": "",
    "id": "manchuria-opium-12"
  },
  {
    "type": "series",
    "category": "薰香花朵凛然綻放",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1735/KD1735001/KD1735001.jpg",
    "author": "三香見SAKA",
    "id": "kaoru-hana-1",
    "title": "薰香花朵凛然綻放 1",
    "subCategory": "",
    "genre": ""
  },
  {
    "author": "三香見SAKA",
    "coverUrl": "",
    "type": "series",
    "tags": [],
    "category": "薰香花朵凛然綻放",
    "genre": "",
    "title": "薰香花朵凛然綻放 7",
    "subCategory": "",
    "id": "kaoru-hana-7"
  },
  {
    "type": "series",
    "tags": [],
    "category": "薰香花朵凛然綻放",
    "coverUrl": "",
    "author": "三香見SAKA",
    "id": "kaoru-hana-8",
    "title": "薰香花朵凛然綻放 8",
    "subCategory": "",
    "genre": ""
  },
  {
    "category": "葬送的芙莉蓮",
    "tags": [],
    "type": "series",
    "author": "山田鐘人/阿部司",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/SC1108/SC1108001/SC1108001.jpg",
    "id": "frieren-1",
    "genre": "",
    "title": "葬送的芙莉蓮 1",
    "subCategory": ""
  },
  {
    "id": "frieren-2",
    "subCategory": "",
    "title": "葬送的芙莉蓮 2",
    "genre": "",
    "tags": [],
    "category": "葬送的芙莉蓮",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/SC1108/SC1108002/SC1108002.jpg",
    "author": "山田鐘人/阿部司"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/SC1108/SC1108003/SC1108003.jpg",
    "author": "山田鐘人/阿部司",
    "tags": [],
    "category": "葬送的芙莉蓮",
    "type": "series",
    "subCategory": "",
    "title": "葬送的芙莉蓮 3",
    "genre": "",
    "id": "frieren-3"
  },
  {
    "tags": [],
    "category": "葬送的芙莉蓮",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/SC1108/SC1108004/SC1108004.jpg",
    "author": "山田鐘人/阿部司",
    "id": "frieren-4",
    "title": "葬送的芙莉蓮 4",
    "subCategory": "",
    "genre": ""
  },
  {
    "author": "山田鐘人/阿部司",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/SC1108/SC1108005/SC1108005.jpg",
    "tags": [],
    "category": "葬送的芙莉蓮",
    "type": "series",
    "genre": "",
    "title": "葬送的芙莉蓮 5",
    "subCategory": "",
    "id": "frieren-5"
  },
  {
    "id": "frieren-6",
    "genre": "",
    "title": "葬送的芙莉蓮 6",
    "subCategory": "",
    "tags": [],
    "category": "葬送的芙莉蓮",
    "type": "series",
    "author": "山田鐘人/阿部司",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/SC1108/SC1108006/SC1108006.jpg"
  },
  {
    "id": "frieren-12",
    "genre": "",
    "title": "葬送的芙莉蓮 12",
    "subCategory": "",
    "category": "葬送的芙莉蓮",
    "tags": [],
    "type": "series",
    "author": "山田鐘人/阿部司",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/SC1108/SC1108012/SC1108012.jpg"
  },
  {
    "id": "frieren-14",
    "title": "葬送的芙莉蓮 14",
    "subCategory": "",
    "genre": "",
    "category": "葬送的芙莉蓮",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/SC1108/SC1108014/SC1108014.jpg",
    "author": "山田鐘人/阿部司"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "伊甸星原 1",
    "id": "edens-1",
    "author": "真島浩",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1514/KD1514001/KD1514001.jpg",
    "type": "series",
    "tags": [],
    "category": "伊甸星原"
  },
  {
    "type": "series",
    "tags": [],
    "category": "伊甸星原",
    "author": "真島浩",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1514/KD1514002/KD1514002.jpg",
    "id": "edens-2",
    "genre": "",
    "subCategory": "",
    "title": "伊甸星原 2"
  },
  {
    "category": "伊甸星原",
    "tags": [],
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1514/KD1514003/KD1514003.jpg",
    "author": "真島浩",
    "id": "edens-3",
    "title": "伊甸星原 3",
    "subCategory": "",
    "genre": ""
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1514/KD1514004/KD1514004.jpg",
    "author": "真島浩",
    "tags": [],
    "category": "伊甸星原",
    "type": "series",
    "title": "伊甸星原 4",
    "subCategory": "",
    "genre": "",
    "id": "edens-4"
  },
  {
    "title": "伊甸星原 5",
    "subCategory": "",
    "genre": "",
    "id": "edens-5",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1514/KD1514005/KD1514005.jpg",
    "author": "真島浩",
    "type": "series",
    "tags": [],
    "category": "伊甸星原"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "少年的深淵 1",
    "id": "abyss-1",
    "author": "峰浪律",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682167885003/20220503034152155143.jpg",
    "type": "series",
    "tags": [],
    "category": "少年的深淵"
  },
  {
    "id": "abyss-2",
    "genre": "",
    "title": "少年的深淵 2",
    "subCategory": "",
    "category": "少年的深淵",
    "tags": [],
    "type": "series",
    "author": "峰浪律",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682184595008/20220609030837646522.jpg"
  },
  {
    "title": "少年的深淵 5",
    "subCategory": "",
    "genre": "",
    "id": "abyss-5",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682358981002/20230325033658421785.jpg",
    "author": "峰浪律",
    "tags": [],
    "category": "少年的深淵",
    "type": "series"
  },
  {
    "author": "峰浪律",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/vendor/eslite_2023062720230627101407/10520906.jpg",
    "tags": [],
    "category": "少年的深淵",
    "type": "series",
    "genre": "",
    "subCategory": "",
    "title": "少年的深淵 6",
    "id": "abyss-6"
  },
  {
    "id": "abyss-7",
    "title": "少年的深淵 7",
    "subCategory": "",
    "genre": "",
    "category": "少年的深淵",
    "tags": [],
    "type": "series",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/vendor/eslite_2023080820230808104215/10520907.jpg",
    "author": "峰浪律"
  },
  {
    "author": "峰浪律",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/vendor/vendor171263335669720240409112918/mainCoverImage1_1241500.jpg",
    "category": "少年的深淵",
    "tags": [],
    "type": "series",
    "genre": "",
    "title": "少年的深淵 10",
    "subCategory": "",
    "id": "abyss-10"
  },
  {
    "id": "abyss-12",
    "genre": "",
    "subCategory": "",
    "title": "少年的深淵 12",
    "tags": [],
    "category": "少年的深淵",
    "type": "series",
    "author": "峰浪律",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/vendor/vendor173700138829720250116122310/mainCoverImage1_1382785.jpg"
  },
  {
    "subCategory": "",
    "title": "少年的深淵 14",
    "genre": "",
    "id": "abyss-14",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/vendor/vendor175153491546220250703172840/mainCoverImage1_1470325.jpg",
    "author": "峰浪律",
    "type": "series",
    "category": "少年的深淵",
    "tags": []
  },
  {
    "author": "峰浪律",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/b2b/vendor/vendor175759217760320250911200300/mainCoverImage1_1519185.jpg",
    "type": "series",
    "tags": [],
    "category": "少年的深淵",
    "genre": "",
    "subCategory": "",
    "title": "少年的深淵 15",
    "id": "abyss-15"
  },
  {
    "category": "笑魘",
    "tags": [],
    "type": "series",
    "author": "根本安巳",
    "coverUrl": "",
    "id": "smile-manga-1",
    "genre": "",
    "title": "笑魘 1",
    "subCategory": ""
  },
  {
    "coverUrl": "",
    "author": "根本安巳",
    "type": "series",
    "tags": [],
    "category": "笑魘",
    "subCategory": "",
    "title": "笑魘 2",
    "genre": "",
    "id": "smile-manga-2"
  },
  {
    "id": "smile-manga-3",
    "subCategory": "",
    "title": "笑魘 3",
    "genre": "",
    "type": "series",
    "category": "笑魘",
    "tags": [],
    "coverUrl": "",
    "author": "根本安巳"
  },
  {
    "tags": [],
    "category": "笑魘",
    "type": "series",
    "author": "根本安巳",
    "coverUrl": "",
    "id": "smile-manga-4",
    "genre": "",
    "title": "笑魘 4",
    "subCategory": ""
  },
  {
    "type": "series",
    "tags": [],
    "category": "笑魘",
    "author": "根本安巳",
    "coverUrl": "",
    "id": "smile-manga-5",
    "genre": "",
    "subCategory": "",
    "title": "笑魘 5"
  },
  {
    "subCategory": "",
    "title": "魔都精兵的奴隸 1",
    "genre": "",
    "id": "matoi-1",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152001/JC1152001.jpg",
    "author": "タカヒロ/竹村洋平",
    "category": "魔都精兵的奴隸",
    "tags": [],
    "type": "series"
  },
  {
    "id": "matoi-2",
    "title": "魔都精兵的奴隸 2",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "category": "魔都精兵的奴隸",
    "tags": [],
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152002/JC1152002.jpg",
    "author": "タカヒロ/竹村洋平"
  },
  {
    "author": "タカヒロ/竹村洋平",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152003/JC1152003.jpg",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "genre": "",
    "subCategory": "",
    "title": "魔都精兵的奴隸 3",
    "id": "matoi-3"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152004/JC1152004.jpg",
    "author": "タカヒロ/竹村洋平",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "title": "魔都精兵的奴隸 4",
    "subCategory": "",
    "genre": "",
    "id": "matoi-4"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152005/JC1152005.jpg",
    "author": "タカヒロ/竹村洋平",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "title": "魔都精兵的奴隸 5",
    "subCategory": "",
    "genre": "",
    "id": "matoi-5"
  },
  {
    "id": "matoi-6",
    "title": "魔都精兵的奴隸 6",
    "subCategory": "",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152006/JC1152006.jpg",
    "author": "タカヒロ/竹村洋平"
  },
  {
    "id": "matoi-7",
    "subCategory": "",
    "title": "魔都精兵的奴隸 7",
    "genre": "",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152007/JC1152007.jpg",
    "author": "タカヒロ/竹村洋平"
  },
  {
    "tags": [],
    "category": "魔都精兵的奴隸",
    "type": "series",
    "author": "タカヒロ/竹村洋平",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152008/JC1152008.jpg",
    "id": "matoi-8",
    "genre": "",
    "subCategory": "",
    "title": "魔都精兵的奴隸 8"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152009/JC1152009.jpg",
    "author": "タカヒロ/竹村洋平",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "subCategory": "",
    "title": "魔都精兵的奴隸 9",
    "genre": "",
    "id": "matoi-9"
  },
  {
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152010/JC1152010.jpg",
    "author": "タカヒロ/竹村洋平",
    "id": "matoi-10",
    "title": "魔都精兵的奴隸 10",
    "subCategory": "",
    "genre": ""
  },
  {
    "title": "魔都精兵的奴隸 11",
    "subCategory": "",
    "genre": "",
    "id": "matoi-11",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152011/JC1152011.jpg",
    "author": "タカヒロ/竹村洋平",
    "category": "魔都精兵的奴隸",
    "tags": [],
    "type": "series"
  },
  {
    "id": "matoi-12",
    "genre": "",
    "title": "魔都精兵的奴隸 12",
    "subCategory": "",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "type": "series",
    "author": "タカヒロ/竹村洋平",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152012/JC1152012.jpg"
  },
  {
    "title": "魔都精兵的奴隸 13",
    "subCategory": "",
    "genre": "",
    "id": "matoi-13",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152013/JC1152013.jpg",
    "author": "タカヒロ/竹村洋平",
    "type": "series",
    "category": "魔都精兵的奴隸",
    "tags": []
  },
  {
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "author": "タカヒロ/竹村洋平",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152014/JC1152014.jpg",
    "id": "matoi-14",
    "genre": "",
    "title": "魔都精兵的奴隸 14",
    "subCategory": ""
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152015/JC1152015.jpg",
    "author": "タカヒロ/竹村洋平",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "subCategory": "",
    "title": "魔都精兵的奴隸 15",
    "genre": "",
    "id": "matoi-15"
  },
  {
    "id": "hikaru-1",
    "subCategory": "",
    "title": "光逝去的夏天 1",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "光逝去的夏天",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66555b5c82b9fd002271422e/800x.webp?source_format=jpg",
    "author": "モクモクれん"
  },
  {
    "type": "series",
    "category": "光逝去的夏天",
    "tags": [],
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66555b62724233001caf79ac/800x.webp?source_format=jpg",
    "author": "モクモクれん",
    "id": "hikaru-2",
    "title": "光逝去的夏天 2",
    "subCategory": "",
    "genre": ""
  },
  {
    "title": "光逝去的夏天 3",
    "subCategory": "",
    "genre": "",
    "id": "hikaru-3",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66555b6ae9a87100194368d3/800x.webp?source_format=jpg",
    "author": "モクモクれん",
    "category": "光逝去的夏天",
    "tags": [],
    "type": "series"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "光逝去的夏天 4",
    "id": "hikaru-4",
    "author": "モクモクれん",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66e0f8fb0971c60013815922/800x.webp?source_format=jpg",
    "category": "光逝去的夏天",
    "tags": [],
    "type": "series"
  },
  {
    "subCategory": "",
    "title": "光逝去的夏天 6",
    "genre": "",
    "id": "hikaru-6",
    "coverUrl": "",
    "author": "モクモクれん",
    "type": "series",
    "tags": [],
    "category": "光逝去的夏天"
  },
  {
    "author": "羅翔",
    "coverUrl": "https://m.media-amazon.com/images/I/61JQU1OQ1pL._SY425_.jpg",
    "type": "single",
    "tags": [],
    "category": "其他單行本",
    "genre": "",
    "title": "法律的悖論",
    "subCategory": "",
    "id": "law-paradox"
  },
  {
    "type": "single",
    "tags": [],
    "category": "其他單行本",
    "author": "羅翔",
    "coverUrl": "https://m.media-amazon.com/images/I/51NSFn+oqlL._SY425_.jpg",
    "id": "law-details",
    "genre": "",
    "title": "法治的細節",
    "subCategory": ""
  },
  {
    "type": "single",
    "tags": [],
    "category": "小說單行本",
    "author": "米澤穗信",
    "coverUrl": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/093/68/0010936850_bc_04.jpg&v=632ae7c8k&w=348&h=348",
    "id": "kokurou-jou",
    "genre": "",
    "title": "黑牢城",
    "subCategory": ""
  },
  {
    "id": "memory-empire",
    "title": "名為帝國的記憶",
    "subCategory": "",
    "genre": "",
    "type": "single",
    "tags": [],
    "category": "小說單行本",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/092/46/0010924694_b_01.jpg&v=62886b7ck&w=348&h=348",
    "author": "阿卡蒂．馬婷"
  },
  {
    "author": "三川美里",
    "coverUrl": "",
    "type": "series",
    "tags": [],
    "category": "龍之國幻想",
    "genre": "",
    "subCategory": "",
    "title": "龍之國幻想 1",
    "id": "dragon-country-1"
  },
  {
    "author": "赫爾曼·梅爾維爾",
    "coverUrl": "",
    "tags": [],
    "category": "小說單行本",
    "type": "single",
    "genre": "",
    "subCategory": "",
    "title": "白鯨 (江蘇鳳凰文藝)",
    "id": "moby-dick-phoenix"
  },
  {
    "tags": [],
    "category": "其他單行本",
    "type": "single",
    "coverUrl": "",
    "author": "葛瑞姆·漢卡克",
    "id": "truth-gods",
    "title": "諸神的真相",
    "subCategory": "",
    "genre": ""
  },
  {
    "coverUrl": "https://pic.arkread.com/cover/ebook/f/331847642.1653693304.jpg!cover_default.jpg",
    "author": "賈爾斯·米爾頓",
    "type": "single",
    "category": "其他單行本",
    "tags": [],
    "title": "改變歷史的香料商人",
    "subCategory": "",
    "genre": "",
    "id": "spice-merchant"
  },
  {
    "id": "strange-peaks-1",
    "genre": "",
    "title": "奇峰異石傳 1",
    "subCategory": "",
    "tags": [],
    "category": "奇峰異石傳",
    "type": "single",
    "author": "司馬中原",
    "coverUrl": ""
  },
  {
    "author": "司馬中原",
    "coverUrl": "",
    "type": "single",
    "tags": [],
    "category": "奇峰異石傳",
    "genre": "",
    "subCategory": "",
    "title": "奇峰異石傳 2",
    "id": "strange-peaks-2"
  },
  {
    "category": "奇峰異石傳",
    "tags": [],
    "type": "single",
    "author": "司馬中原",
    "coverUrl": "",
    "id": "strange-peaks-3",
    "genre": "",
    "title": "奇峰異石傳 3",
    "subCategory": ""
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "國王遊戲",
    "id": "kings-game-1",
    "author": "金澤伸明",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/053/35/0010533527_bc_01.jpg&v=4f156cfck&w=348&h=348",
    "category": "國王遊戲",
    "type": "series"
  },
  {
    "genre": "",
    "title": "國王遊戲〈終極〉",
    "subCategory": "",
    "id": "kings-game-2",
    "author": "金澤伸明",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/054/08/0010540893_bc_01.jpg&v=4f799f4bk&w=348&h=348",
    "category": "國王遊戲",
    "type": "series"
  },
  {
    "title": "國王遊戲〈滅亡6.08〉",
    "subCategory": "",
    "genre": "",
    "id": "kings-game-3",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/055/52/0010555267_bc_01.jpg&v=502b8c6bk&w=348&h=348",
    "author": "金澤伸明",
    "category": "國王遊戲",
    "type": "series"
  },
  {
    "type": "series",
    "category": "明日同學的水手服",
    "author": "博",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682214945001/20220727033419568640.jpg",
    "id": "akebi-sailor-9",
    "genre": "",
    "subCategory": "",
    "title": "明日同學的水手服 9"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "明日同學的水手服 10",
    "id": "akebi-sailor-10",
    "author": "博",
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x900/s.eslite.com/upload/product/o/2682325988003/20230110041048918149.jpg",
    "category": "明日同學的水手服",
    "type": "series"
  },
  {
    "tags": [],
    "category": "夫婦以上，戀人未滿",
    "type": "single",
    "author": "金丸祐基",
    "coverUrl": "",
    "id": "fuufu-ijyou-12",
    "genre": "",
    "subCategory": "",
    "title": "夫婦以上，戀人未滿 12"
  },
  {
    "id": "matoi-16",
    "genre": "",
    "title": "魔都精兵的奴隸 16",
    "subCategory": "",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "author": "タカヒロ/竹村洋平",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152016/JC1152016.jpg"
  },
  {
    "title": "魔都精兵的奴隸 17",
    "subCategory": "",
    "genre": "",
    "id": "matoi-17",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152017/JC1152017.jpg",
    "author": "タカヒロ/竹村洋平",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "type": "series"
  },
  {
    "id": "matoi-18",
    "subCategory": "",
    "title": "魔都精兵的奴隸 18",
    "genre": "",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152018/JC1152018.jpg",
    "author": "タカヒロ/竹村洋平"
  },
  {
    "author": "タカヒロ/竹村洋平",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152019/JC1152019.jpg",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "genre": "",
    "subCategory": "",
    "title": "魔都精兵的奴隸 19",
    "id": "matoi-19"
  },
  {
    "id": "matoi-20",
    "genre": "",
    "title": "魔都精兵的奴隸 20",
    "subCategory": "",
    "type": "series",
    "tags": [],
    "category": "魔都精兵的奴隸",
    "author": "タカヒロ/竹村洋平",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1152/JC1152020/JC1152020.jpg"
  },
  {
    "genre": "",
    "subCategory": "",
    "title": "2.5次元的誘惑 19",
    "id": "ririsa-19",
    "author": "橋本悠",
    "coverUrl": "",
    "type": "series",
    "tags": [],
    "category": "2.5次元的誘惑"
  },
  {
    "title": "2.5次元的誘惑 20",
    "subCategory": "",
    "genre": "",
    "id": "ririsa-20",
    "coverUrl": "",
    "author": "橋本悠",
    "category": "2.5次元的誘惑",
    "tags": [],
    "type": "series"
  },
  {
    "title": "小鼠的初戀 1",
    "subCategory": "",
    "genre": "",
    "id": "nesumi-1",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1846/KD1846001/KD1846001.jpg",
    "author": "雪本愁二",
    "category": "小鼠的初戀",
    "tags": [],
    "type": "series"
  },
  {
    "id": "nesumi-2",
    "subCategory": "",
    "title": "小鼠的初戀 2",
    "genre": "",
    "tags": [],
    "category": "小鼠的初戀",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1846/KD1846002/KD1846002.jpg",
    "author": "雪本愁二"
  },
  {
    "type": "series",
    "tags": [],
    "category": "小鼠的初戀",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1846/KD1846003/KD1846003.jpg",
    "author": "雪本愁二",
    "id": "nesumi-3",
    "title": "小鼠的初戀 3",
    "subCategory": "",
    "genre": ""
  },
  {
    "title": "小鼠的初戀 4",
    "subCategory": "",
    "genre": "",
    "id": "nesumi-4",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1846/KD1846004/KD1846004.jpg",
    "author": "雪本愁二",
    "type": "series",
    "category": "小鼠的初戀",
    "tags": []
  },
  {
    "id": "smile-manga-7",
    "genre": "",
    "subCategory": "",
    "title": "笑魘 7",
    "type": "series",
    "tags": [],
    "category": "笑魘",
    "author": "根本安巳",
    "coverUrl": ""
  },
  {
    "genre": "",
    "title": "笑魘 8",
    "subCategory": "",
    "id": "smile-manga-8",
    "author": "根本安巳",
    "coverUrl": "",
    "tags": [],
    "category": "笑魘",
    "type": "series"
  },
  {
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1343/JC1343007/JC1343007.jpg",
    "author": "外薗健",
    "type": "series",
    "category": "神樂鉢",
    "title": "神樂鉢 7",
    "subCategory": "",
    "genre": "",
    "id": "kagurabachi-7"
  },
  {
    "id": "kagurabachi-8",
    "title": "神樂鉢 8",
    "subCategory": "",
    "genre": "",
    "category": "神樂鉢",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/JC1343/JC1343008/JC1343008.jpg",
    "author": "外薗健"
  },
  {
    "category": "其他單行本",
    "tags": [],
    "type": "single",
    "author": "司馬中原",
    "coverUrl": "",
    "id": "strange-peaks",
    "genre": "",
    "title": "奇峰異石傳",
    "subCategory": ""
  },
  {
    "category": "其他單行本",
    "tags": [],
    "type": "single",
    "author": "李光天",
    "coverUrl": "https://img1.books.com.tw/image/getImage?i=https://www.books.com.tw/img/001/014/35/0010143521.jpg&v=4124cb11k&w=348&h=348",
    "id": "journey-memories",
    "genre": "",
    "title": "旅途記憶",
    "subCategory": ""
  },
  {
    "category": "小說單行本",
    "tags": [],
    "type": "single",
    "author": "Peter Su",
    "coverUrl": "https://img1.books.com.tw/image/getImage?i=https://www.books.com.tw/img/001/072/33/0010723322.jpg&v=57973719k&w=348&h=348",
    "id": "if-simple-who-wants-complex",
    "genre": "",
    "title": "如果可以簡單，誰想要複雜",
    "subCategory": ""
  },
  {
    "category": "小說單行本",
    "tags": [],
    "type": "single",
    "author": "于日辰",
    "coverUrl": "https://img1.books.com.tw/image/getImage?i=https://www.books.com.tw/img/001/058/27/0010582737.jpg&v=516a2efak&w=348&h=348",
    "id": "one-prison-one-world",
    "genre": "",
    "title": "壹獄壹世界",
    "subCategory": ""
  },
  {
    "category": "小說單行本",
    "tags": [],
    "type": "single",
    "author": "嵇零",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/CN1/802/26/CN18022675.jpg&v=69cc8582k&w=348&h=348",
    "id": "starvation-mings-journey",
    "genre": "",
    "title": "餓殍：明末千里行",
    "subCategory": ""
  },
  {
    "title": "堀與宮村 1",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-1"
  },
  {
    "title": "堀與宮村 2",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-2"
  },
  {
    "title": "堀與宮村 3",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-3"
  },
  {
    "title": "堀與宮村 4",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-4"
  },
  {
    "title": "堀與宮村 5",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-5"
  },
  {
    "title": "堀與宮村 6",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-6"
  },
  {
    "title": "堀與宮村 7",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-7"
  },
  {
    "title": "堀與宮村 8",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-8"
  },
  {
    "title": "堀與宮村 9",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-9"
  },
  {
    "title": "堀與宮村 10",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-10"
  },
  {
    "title": "堀與宮村 10.5",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-10-5"
  },
  {
    "title": "堀與宮村 11",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-11"
  },
  {
    "title": "堀與宮村 12",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-12"
  },
  {
    "title": "堀與宮村 13",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-13"
  },
  {
    "title": "堀與宮村 14",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-14"
  },
  {
    "title": "堀與宮村 15",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-15"
  },
  {
    "title": "堀與宮村 16",
    "author": "HERO / 萩原ダイスケ",
    "category": "堀與宮村",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "horimiya-16"
  },
  {
    "title": "藍色監獄 1",
    "author": "金城宗幸 / ノ村優介",
    "category": "藍色監獄",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1569/KD1569001/KD1569001.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "bluelock-1"
  },
  {
    "title": "藍色監獄 2",
    "author": "金城宗幸 / ノ村優介",
    "category": "藍色監獄",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1569/KD1569002/KD1569002.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "bluelock-2"
  },
  {
    "title": "藍色監獄 3",
    "author": "金城宗幸 / ノ村優介",
    "category": "藍色監獄",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1569/KD1569003/KD1569003.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "bluelock-3"
  },
  {
    "title": "藍色監獄 4",
    "author": "金城宗幸 / ノ村優介",
    "category": "藍色監獄",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1569/KD1569004/KD1569004.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "bluelock-4"
  },
  {
    "title": "藍色監獄 5",
    "author": "金城宗幸 / ノ村優介",
    "category": "藍色監獄",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1569/KD1569005/KD1569005.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "bluelock-5"
  },
  {
    "title": "藍色監獄 6",
    "author": "金城宗幸 / ノ村優介",
    "category": "藍色監獄",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1569/KD1569006/KD1569006.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "bluelock-6"
  },
  {
    "title": "藍色監獄 7",
    "author": "金城宗幸 / ノ村優介",
    "category": "藍色監獄",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1569/KD1569007/KD1569007.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "bluelock-7"
  },
  {
    "title": "藍色監獄 8",
    "author": "金城宗幸 / ノ村優介",
    "category": "藍色監獄",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/KD1569/KD1569008/KD1569008.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "bluelock-8"
  },
  {
    "title": "進擊的巨人 1",
    "author": "諫山創",
    "category": "進擊的巨人",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "aot-1"
  },
  {
    "title": "進擊的巨人 2",
    "author": "諫山創",
    "category": "進擊的巨人",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "aot-2"
  },
  {
    "title": "進擊的巨人 3",
    "author": "諫山創",
    "category": "進擊的巨人",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "aot-3"
  },
  {
    "title": "進擊的巨人 4",
    "author": "諫山創",
    "category": "進擊的巨人",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "aot-4"
  },
  {
    "title": "進擊的巨人 5",
    "author": "諫山創",
    "category": "進擊的巨人",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "aot-5"
  },
  {
    "title": "進擊的巨人 6",
    "author": "諫山創",
    "category": "進擊的巨人",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "aot-6"
  },
  {
    "title": "進擊的巨人 7",
    "author": "諫山創",
    "category": "進擊的巨人",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "aot-7"
  },
  {
    "title": "黑貓與魔女的教室 7",
    "author": "金田陽介",
    "category": "黑貓與魔女的教室",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "black-cat-witch-7"
  },
  {
    "title": "黑貓與魔女的教室 8",
    "author": "金田陽介",
    "category": "黑貓與魔女的教室",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "black-cat-witch-8"
  },
  {
    "title": "東京外星人 1",
    "author": "NAOE",
    "category": "東京外星人",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/IC0348/IC0348001/IC0348001.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "tokyo-aliens-1"
  },
  {
    "title": "東京外星人 2",
    "author": "NAOE",
    "category": "東京外星人",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/IC0348/IC0348002/IC0348002.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "tokyo-aliens-2"
  },
  {
    "title": "東京外星人 3",
    "author": "NAOE",
    "category": "東京外星人",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/IC0348/IC0348003/IC0348003.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "tokyo-aliens-3"
  },
  {
    "title": "東京外星人 4",
    "author": "NAOE",
    "category": "東京外星人",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/IC0348/IC0348004/IC0348004.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "tokyo-aliens-4"
  },
  {
    "title": "東京外星人 5",
    "author": "NAOE",
    "category": "東京外星人",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/IC0348/IC0348005/IC0348005.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "tokyo-aliens-5"
  },
  {
    "title": "東京外星人 6",
    "author": "NAOE",
    "category": "東京外星人",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/IC0348/IC0348006/IC0348006.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "tokyo-aliens-6"
  },
  {
    "title": "東京外星人 7",
    "author": "NAOE",
    "category": "東京外星人",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/IC0348/IC0348007/IC0348007.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "tokyo-aliens-7"
  },
  {
    "title": "東京外星人 8",
    "author": "NAOE",
    "category": "東京外星人",
    "type": "series",
    "coverUrl": "https://www.tongli.com.tw/ComicImages/Images/IC0348/IC0348008/IC0348008.jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "tokyo-aliens-8"
  },
  {
    "title": "幼稚園WARS 1",
    "author": "千葉侑生",
    "category": "幼稚園WARS",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "kindergarten-wars-1"
  },
  {
    "title": "幼稚園WARS 2",
    "author": "千葉侑生",
    "category": "幼稚園WARS",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "kindergarten-wars-2"
  },
  {
    "title": "入間黑手黨 2",
    "author": "西修 / hiro者",
    "category": "入間黑手黨",
    "type": "series",
    "coverUrl": "",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "iruma-mafia-2"
  },
  {
    "title": "灰仭巫覡 1",
    "author": "大久保篤",
    "category": "灰仭巫覡",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/67d3ebd859294b000fa37531/800x.webp?source_format=jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "kaijin-fugaku-1"
  },
  {
    "title": "灰仭巫覡 2",
    "author": "大久保篤",
    "category": "灰仭巫覡",
    "type": "series",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6891d7e609b76d00162dbc66/800x.webp?source_format=jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "kaijin-fugaku-2"
  },
  {
    "title": "與奔馳於透明之夜的你，談一場看不見的戀愛",
    "author": "志馬なにし",
    "category": "輕小說單行本",
    "type": "single",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66507637ecb303001fbb74d6/800x.webp?source_format=jpg",
    "tags": [],
    "subCategory": "",
    "genre": "",
    "id": "transparent-night-love"
  },
  {
    "id": "accel-world-1",
    "title": "加速世界 1",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/664005fde0514b0010f087b0/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-2",
    "title": "加速世界 2",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66400817e1961f001398b4e2/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-3",
    "title": "加速世界 3",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6640048fb7445e00100b4753/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-4",
    "title": "加速世界 4",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/664003b2074b1200220b3f66/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-5",
    "title": "加速世界 5",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6640022781d8f50013cc31bb/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-6",
    "title": "加速世界 6",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/6640011ce0514b0019f0870a/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-7",
    "title": "加速世界 7",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663fff54493ce80019b8c446/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-8",
    "title": "加速世界 8",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663ffe45e1961f001f98b2ba/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-9",
    "title": "加速世界 9",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663ffc7821eacc002209d8b6/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-10",
    "title": "加速世界 10",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663ff0009b88f13bfefe6217/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-11",
    "title": "加速世界 11",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663fecb7b64daf001648094c/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-12",
    "title": "加速世界 12",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663fe897b5118f0016586408/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-13",
    "title": "加速世界 13",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663fe06bca0478001345b711/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-14",
    "title": "加速世界 14",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663fdd066595b5001f8272ab/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-15",
    "title": "加速世界 15",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663fd5342f705500199fb7cb/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-16",
    "title": "加速世界 16",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663fce4d6595b500138270f4/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-17",
    "title": "加速世界 17",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663fc0c22a20510022655f33/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-18",
    "title": "加速世界 18",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66401444b0a0ec000d1599fc/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-19",
    "title": "加速世界 19",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/66400f88019e9b0013788277/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "accel-world-21",
    "title": "加速世界 21",
    "author": "川原礫",
    "category": "加速世界",
    "coverUrl": "https://shoplineimg.com/655b0f3c9b81d900188b35f1/663ff9c5f41cf50019496003/800x.webp?source_format=jpg",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "shigatsu-shinsou-1",
    "title": "四月是你的謊言 新裝版 1",
    "author": "新川直司",
    "category": "四月是你的謊言 新裝版",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "青春"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "shigatsu-shinsou-2",
    "title": "四月是你的謊言 新裝版 2",
    "author": "新川直司",
    "category": "四月是你的謊言 新裝版",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "青春"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "shigatsu-shinsou-3",
    "title": "四月是你的謊言 新裝版 3",
    "author": "新川直司",
    "category": "四月是你的謊言 新裝版",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "青春"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-1",
    "title": "五等分的新娘 1",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-2",
    "title": "五等分的新娘 2",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-3",
    "title": "五等分的新娘 3",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-4",
    "title": "五等分的新娘 4",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-5",
    "title": "五等分的新娘 5",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-6",
    "title": "五等分的新娘 6",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-7",
    "title": "五等分的新娘 7",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-8",
    "title": "五等分的新娘 8",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-9",
    "title": "五等分的新娘 9",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-10",
    "title": "五等分的新娘 10",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-11",
    "title": "五等分的新娘 11",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-12",
    "title": "五等分的新娘 12",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-13",
    "title": "五等分的新娘 13",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "gotoubun-14",
    "title": "五等分的新娘 14",
    "author": "春場蔥",
    "category": "五等分的新娘",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "校園",
      "戀愛"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "manga-ruby-all",
    "title": "RUBY 全",
    "author": "三輪士郎",
    "category": "RUBY",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "冒險",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "inutokuzu-1",
    "title": "犬與屑 1",
    "author": "朝賀庵",
    "category": "犬與屑",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "inutokuzu-2",
    "title": "犬與屑 2",
    "author": "朝賀庵",
    "category": "犬與屑",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "inutokuzu-3",
    "title": "犬與屑 3",
    "author": "朝賀庵",
    "category": "犬與屑",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "inutokuzu-4",
    "title": "犬與屑 4",
    "author": "朝賀庵",
    "category": "犬與屑",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "inutokuzu-5",
    "title": "犬與屑 5",
    "author": "朝賀庵",
    "category": "犬與屑",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "allyouneediskill-1",
    "title": "All You Need Is Kill 1",
    "author": "小畑健/竹內良輔/櫻坂洋",
    "category": "All You Need Is Kill",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "allyouneediskill-2",
    "title": "All You Need Is Kill 2",
    "author": "小畑健/竹內良輔/櫻坂洋",
    "category": "All You Need Is Kill",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "戰鬥"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "nishizawa5-short-all",
    "title": "西沢5短篇集 全",
    "author": "西沢5ミリ",
    "category": "西沢5短篇集",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戀愛",
      "搞笑"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-1",
    "title": "地獄樂 1",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-2",
    "title": "地獄樂 2",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-3",
    "title": "地獄樂 3",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-4",
    "title": "地獄樂 4",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-5",
    "title": "地獄樂 5",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-6",
    "title": "地獄樂 6",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-7",
    "title": "地獄樂 7",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-8",
    "title": "地獄樂 8",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-9",
    "title": "地獄樂 9",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-10",
    "title": "地獄樂 10",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-11",
    "title": "地獄樂 11",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-12",
    "title": "地獄樂 12",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-13",
    "title": "地獄樂 13",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻",
      "黑暗"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "jigokuraku-guide",
    "title": "地獄樂 解體全書",
    "author": "賀來友治",
    "category": "地獄樂",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "戰鬥",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "mujitsunohana-1",
    "title": "無實之花 1",
    "author": "隈浪さえ",
    "category": "無實之花",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "mujitsunohana-2",
    "title": "無實之花 2",
    "author": "隈浪さえ",
    "category": "無實之花",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "mujitsunohana-3",
    "title": "無實之花 3",
    "author": "隈浪さえ",
    "category": "無實之花",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "kaettekita-alice-1",
    "title": "歸來的愛麗絲 1",
    "author": "押見修造",
    "category": "歸來的愛麗絲",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "青春",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "kaettekita-alice-2",
    "title": "歸來的愛麗絲 2",
    "author": "押見修造",
    "category": "歸來的愛麗絲",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "青春",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "kaettekita-alice-3",
    "title": "歸來的愛麗絲 3",
    "author": "押見修造",
    "category": "歸來的愛麗絲",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "青春",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "kaettekita-alice-4",
    "title": "歸來的愛麗絲 4",
    "author": "押見修造",
    "category": "歸來的愛麗絲",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "青春",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "kaettekita-alice-5",
    "title": "歸來的愛麗絲 5",
    "author": "押見修造",
    "category": "歸來的愛麗絲",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "青春",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "kaettekita-alice-6",
    "title": "歸來的愛麗絲 6",
    "author": "押見修造",
    "category": "歸來的愛麗絲",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "青春",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "kaettekita-alice-7",
    "title": "歸來的愛麗絲 7",
    "author": "押見修造",
    "category": "歸來的愛麗絲",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "青春",
      "校園"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-1",
    "title": "夏日時光 1",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-2",
    "title": "夏日時光 2",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-3",
    "title": "夏日時光 3",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-4",
    "title": "夏日時光 4",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-5",
    "title": "夏日時光 5",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-6",
    "title": "夏日時光 6",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-7",
    "title": "夏日時光 7",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-8",
    "title": "夏日時光 8",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-9",
    "title": "夏日時光 9",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-10",
    "title": "夏日時光 10",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-11",
    "title": "夏日時光 11",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-12",
    "title": "夏日時光 12",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "summertime-render-13",
    "title": "夏日時光 13",
    "author": "田中靖規",
    "category": "夏日時光",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "懸疑",
      "奇幻"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "takopi-sin-1",
    "title": "章魚嗶的原罪 1",
    "author": "タイザン5",
    "category": "章魚嗶的原罪",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "黑暗",
      "懸疑"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "takopi-sin-2",
    "title": "章魚嗶的原罪 2",
    "author": "タイザン5",
    "category": "章魚嗶的原罪",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "黑暗",
      "懸疑"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "shoujo-shuumatsu-1",
    "title": "少女終末旅行 1",
    "author": "つくみず",
    "category": "少女終末旅行",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "冒險"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "shoujo-shuumatsu-2",
    "title": "少女終末旅行 2",
    "author": "つくみず",
    "category": "少女終末旅行",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "冒險"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "shoujo-shuumatsu-3",
    "title": "少女終末旅行 3",
    "author": "つくみず",
    "category": "少女終末旅行",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "冒險"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "shoujo-shuumatsu-4",
    "title": "少女終末旅行 4",
    "author": "つくみず",
    "category": "少女終末旅行",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "冒險"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "shoujo-shuumatsu-5",
    "title": "少女終末旅行 5",
    "author": "つくみず",
    "category": "少女終末旅行",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "冒險"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "shoujo-shuumatsu-6",
    "title": "少女終末旅行 6",
    "author": "つくみず",
    "category": "少女終末旅行",
    "coverUrl": "",
    "type": "series",
    "tags": [
      "科幻",
      "冒險"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-1",
    "title": "我推的孩子 1",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/089/81/0010898166.jpg&v=60f55432k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-2",
    "title": "我推的孩子 2",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/089/81/0010898169.jpg&v=60f55432k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-3",
    "title": "我推的孩子 3",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/090/29/0010902945.jpg&v=6139e236k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-4",
    "title": "我推的孩子 4",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/091/93/0010919364.jpg&v=622b24d5k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-5",
    "title": "我推的孩子 5",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/092/36/0010923680.jpg&v=626a6cb3k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-6",
    "title": "我推的孩子 6",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/093/44/0010934482.jpg&v=6305fe04k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-7",
    "title": "我推的孩子 7",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/094/71/0010947186.jpg&v=63b7f8a8k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-8",
    "title": "我推的孩子 8",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/095/74/0010957451.jpg&v=64620a5ck&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-9",
    "title": "我推的孩子 9",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/096/41/0010964193.jpg&v=64c0f602k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-10",
    "title": "我推的孩子 10",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/097/02/0010970280.jpg&v=651d3ec3k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-11",
    "title": "我推的孩子 11",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/098/11/0010981121.jpg&v=65b238b5k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-12",
    "title": "我推的孩子 12",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/098/63/0010986306.jpg&v=660a8d08k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-13",
    "title": "我推的孩子 13",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/099/65/0010996579.jpg&v=66a37b00k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-14",
    "title": "我推的孩子 14",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/101/06/0011010621.jpg&v=6773d6d4k&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-15",
    "title": "我推的孩子 15",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/102/88/0011028873.jpg&v=688c972ck&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "oshinoko-16",
    "title": "我推的孩子 16",
    "author": "赤坂明/橫槍萌果",
    "category": "我推的孩子",
    "coverUrl": "https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/102/88/0011028875.jpg&v=688c972dk&w=348&h=348",
    "type": "series",
    "tags": [],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "look-back-single",
    "title": "驀然回首",
    "author": "藤本樹",
    "category": "漫畫單行本",
    "coverUrl": "",
    "type": "single",
    "tags": [
      "青春"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "goodbye-eri-single",
    "title": "再見繪梨",
    "author": "藤本樹",
    "category": "漫畫單行本",
    "coverUrl": "",
    "type": "single",
    "tags": [
      "青春"
    ],
    "subCategory": "",
    "genre": ""
  },
  {
    "id": "artbook-elden-ring-2",
    "title": "ELDEN RING OFFICIAL ART BOOK Volume II",
    "author": "フロム・ソフトウェア (FromSoftware)",
    "category": "ELDEN RING OFFICIAL ART BOOK",
    "type": "series",
    "originDomain": "game",
    "volume": 2,
    "seriesGroup": "ELDEN RING OFFICIAL ART BOOK",
    "tags": [],
    "coverUrl": "https://cdn.kdkw.jp/cover_1000/322205/322205000378.webp"
  },
  {
    "id": "artbook-genshin-1",
    "title": "原神插畫集 Vol.1",
    "author": "原神項目組 (miHoYo) / 台灣角川",
    "category": "原神插畫集",
    "type": "series",
    "originDomain": "game",
    "volume": 1,
    "seriesGroup": "原神插畫集",
    "tags": [],
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x768/smart/filters:sharpen(sigma):format(webp)/s.eslite.com/upload/product/o/2682237305004/20230218135119515062.jpg"
  },
  {
    "id": "artbook-genshin-2",
    "title": "原神插畫集 Vol.2",
    "author": "原神項目組 (miHoYo) / 台灣角川",
    "category": "原神插畫集",
    "type": "series",
    "originDomain": "game",
    "volume": 2,
    "seriesGroup": "原神插畫集",
    "tags": [],
    "coverUrl": "https://s2.eslite.com/unsafe/fit-in/x768/smart/filters:sharpen(sigma):format(webp)/s.eslite.com/b2b/vendor/2024011120240112112947/mainCoverImage2_1205673.jpg"
  }
];
