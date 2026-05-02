import type { Hotspot, SceneGraph, SceneNode, SafeZone } from '../types/scene'
import { getSceneAssetPaths } from '../utils/sceneAssets'
import { parseSceneGraph } from '../utils/sceneGraphValidation'

const officialGuidebookUrl =
  'https://www.visitjeju.net/pdf/Official%20Jeju%20Tourism%20Guidebook_en.pdf'
const visitJejuBaseUrl = 'https://www.visitjeju.net/en'
const lastTravelGuideVerification = '2026-05-02'

const travelGuides: Partial<
  Record<string, NonNullable<SceneNode['content']['travelGuide']>>
> = {
  'ext-hallasan': {
    status: 'official-reference',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [
      'https://www.visitjeju.net/en/detail/view?contentsid=CONT_000000000500685',
      'https://visithalla.jeju.go.kr/main/main.do?language=en',
      officialGuidebookUrl,
    ],
    fee: '入山本身通常不以门票作为核心成本；停车、交通、装备和补给才是主要预算项。出行前以 Hallasan 官方预约系统为准。',
    reservation:
      '热门登山线路可能需要通过 Hallasan 官方系统预约，尤其是旺季、周末和清晨时段。',
    hours:
      '登山有入山/下撤时间限制，且会随季节和天气调整；不要只按地图距离估算。',
    transport:
      '自驾最灵活，但停车和清晨出发压力较高；公交可行但要提前核对首末班和登山口。',
    duration: '半日到一整天，取决于选择短线步道还是完整登顶线路。',
    cautions: [
      '天气变化快，山上风、雨、温差会显著影响体验。',
      '登山线路不是普通景点散步，鞋、补水和返程时间要提前计划。',
      '如官方因天气关闭或限制入山，应直接调整为低海拔景点。',
    ],
    bestFor: '适合想理解济州地理核心、愿意为徒步和天气留余量的旅行者。',
  },
  'ext-seongsan': {
    status: 'official-reference',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [
      'https://www.visitjeju.net/en/detail/view?contentsid=CONT_000000000500349',
      officialGuidebookUrl,
    ],
    fee: '可能收取景区入场费，具体 KRW 价格按官方页面或现场公告为准。',
    reservation: '一般按景区现场游览逻辑安排；团队、日出时段或旺季建议提前确认开放状态。',
    hours:
      '日出/清晨是经典时间，但开放时间和登顶入口管理会受季节、天气影响。',
    transport:
      '自驾或东部公交均可安排；若同日去 Udo，建议把 Seongsan 与 ferry 时间放在同一区域规划。',
    duration: '约 1.5-2.5 小时；如果看日出或拍摄停留，预留更久。',
    cautions: [
      '登顶有台阶和坡度，不适合完全当作平地观景点。',
      '风大时体感会明显下降，海边拍摄注意保暖和防滑。',
      '旺季停车和入口排队会拉长实际停留时间。',
    ],
    bestFor: '适合第一次来济州、想要一个辨识度极高的东部地标。',
  },
  'ext-udo': {
    status: 'official-reference',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [
      'https://www.visitjeju.net/en/detail/view?contentsid=CONT_000000000500477',
      officialGuidebookUrl,
    ],
    fee: '核心费用来自往返 ferry、岛上交通和租赁；具体 KRW 费用按码头/官方公告为准。',
    reservation: '通常按 ferry 班次和现场购票安排；天气差或海况变化时要优先确认船班。',
    hours:
      'Udo 行程受 ferry 首末班约束，不建议把返程压到最后一班。',
    transport:
      '从 Seongsan 区域衔接最顺；岛上可按体力和天气选择步行、巴士、自行车或电动车类交通。',
    duration: '半日最稳妥；赶时间可短停，但会失去 Udo 慢节奏优势。',
    cautions: [
      '强风、雨天和海况会直接影响船班与骑行体验。',
      '岛上环线看似轻松，但停拍和排队会消耗时间。',
      '不要把 Udo 塞进已经很满的东部一日线。',
    ],
    bestFor: '适合想把东部行程放慢、体验小岛环线和海岸节奏的人。',
  },
  'ext-jusangjeolli': {
    status: 'official-reference',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [
      `${visitJejuBaseUrl}/search?keyword=Jusangjeolli`,
      officialGuidebookUrl,
    ],
    fee: '观景区可能收取入场费，具体 KRW 价格以官方页面或现场公告为准。',
    reservation: '通常不作为预约型景点安排；团队或旺季停车仍建议预留弹性。',
    hours: '按景区开放时间进入，强风、暴雨或海况差时观景体验会明显下降。',
    transport:
      '更适合和中文旅游区、南部海岸、瀑布类景点组合；自驾衔接效率较高。',
    duration: '约 40-90 分钟，主要取决于拍照、栈道拥挤和停车情况。',
    cautions: [
      '不要期待长时间深度游，它更像高辨识度地质观景点。',
      '海风强时注意帽子、相机和儿童安全。',
      '阴雨天玄武岩质感更强，但视野和拍摄舒适度下降。',
    ],
    bestFor: '适合想快速理解济州火山海岸质感、并和南部行程组合的人。',
  },
  'ext-waterfalls': {
    status: 'official-reference',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [
      `${visitJejuBaseUrl}/search?keyword=waterfall`,
      officialGuidebookUrl,
    ],
    fee: '不同瀑布景点收费不同，具体 KRW 门票以对应官方页面或现场公告为准。',
    reservation: '通常按现场游览安排；雨季、节假日和旅行团高峰会影响动线。',
    hours: '按各瀑布景区开放时间进入；雨后水量好但地面湿滑。',
    transport:
      '适合与西归浦、中文旅游区、柱状节理带一起安排，减少跨岛移动。',
    duration: '单个瀑布约 45-90 分钟；多个瀑布组合建议预留半天。',
    cautions: [
      '不同瀑布步行强度差异明显，带老人儿童时要确认台阶和坡道。',
      '雨天画面更有氛围，但防滑和防水比拍照更重要。',
      '不要把多个相似瀑布连续塞满，容易审美疲劳。',
    ],
    bestFor: '适合给火山/海岸行程增加阴凉、绿色和水景对比。',
  },
  'ext-jeju-culture': {
    status: 'editorial-guidance',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [officialGuidebookUrl],
    fee: '文化村、博物馆、民俗点收费差异较大；具体 KRW 价格按目标点官方公告确认。',
    reservation: '普通文化散步点通常不需要预约；体验课、讲解、博物馆活动需要提前确认。',
    hours: '室内馆和体验项目更依赖开放日历；村落/街区类点位也要尊重居民生活时间。',
    transport:
      '适合插入东部、南部或市区路线之间，不建议为了单一文化点跨岛折返。',
    duration: '约 1-2 小时；如果含博物馆或体验活动，预留 2-3 小时。',
    cautions: [
      '不要只把石像和村落当拍照背景，注意动线礼貌和居民空间。',
      '体验型活动受语言、时间和预约限制影响更大。',
      '文化点更适合作为节奏调整，不一定要追求打卡数量。',
    ],
    bestFor: '适合想让济州不只是自然景观，也有材料、风、石墙和生活纹理的人。',
  },
  'ext-food': {
    status: 'editorial-guidance',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [officialGuidebookUrl],
    fee: '餐饮预算取决于黑猪、海鲜、套餐和市场小吃选择；以店铺菜单 KRW 标价为准。',
    reservation: '热门黑猪/海鲜店晚餐可能需要排队或预约，建议避开最拥挤饭点。',
    hours: '餐厅、市场、夜市时段差异很大；不要假设全天都有完整菜单。',
    transport:
      '晚餐建议优先选住宿或当日路线附近，避免饭后长距离跨岛返程。',
    duration: '正餐约 1-1.5 小时；市场小吃可 45-90 分钟。',
    cautions: [
      '热门店排队不一定等于最适合你的路线，先看位置和当天体力。',
      '海鲜和烧烤类价格差异大，点单前确认份量和计价方式。',
      '把食物作为路线收尾更舒服，不要让餐厅位置破坏整天动线。',
    ],
    bestFor: '适合把济州记忆从风景延伸到黑猪、海鲜、柑橘和市场氛围。',
  },
  'ext-dongmun-market': {
    status: 'official-reference',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [
      `${visitJejuBaseUrl}/search?keyword=Dongmun%20Market`,
      officialGuidebookUrl,
    ],
    fee: '市场本身通常不按景区门票理解，消费按摊位/店铺 KRW 标价为准。',
    reservation: '不需要景点预约；夜市、人流高峰和热门摊位需要排队预期。',
    hours: '市场、夜市和不同摊位营业时间不同，晚到不代表所有店都还开。',
    transport:
      '更适合作为济州市区、机场前后或住宿附近的轻量节点；停车可能比想象更花时间。',
    duration: '约 1-2 小时；只买伴手礼可更短，吃夜市可更久。',
    cautions: [
      '高峰时段通道拥挤，行李箱会明显降低移动效率。',
      '海鲜、熟食、伴手礼分区节奏不同，先确定目标再逛。',
      '作为最后一站时要给机场/还车留出缓冲。',
    ],
    bestFor: '适合补充城市烟火气、伴手礼和轻松吃逛。',
  },
  'ext-one-day-route': {
    status: 'editorial-guidance',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [officialGuidebookUrl],
    transport:
      '默认自驾或包车最稳；公共交通一日线需要显著减少停靠点。',
    duration: '完整一天，建议只选择一个区域主轴，例如东部或南部。',
    cautions: [
      '不要同时追求 Hallasan、Udo、南部瀑布和市场，转场会吃掉体验。',
      '把天气备选放在同一区域内，避免临时跨岛。',
      '最后一站离住宿/机场越近，整天越稳定。',
    ],
    bestFor: '适合短暂停留、转机延伸或第一次来济州但时间有限的人。',
  },
  'ext-three-day-route': {
    status: 'editorial-guidance',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [officialGuidebookUrl],
    transport:
      '默认自驾最顺；如果不用车，建议围绕住宿分区减少每日跨岛。',
    duration: '3 天 2 晚或 4 天 3 晚都可使用此节奏，关键是每天只做一到两个区域。',
    cautions: [
      '第一天不要排太满，航班、取车、天气都会影响开局。',
      '把东部、南部、市区/食物分天处理，比每天绕岛更舒服。',
      '保留一段可替换时间，应对风雨或临时关闭。',
    ],
    bestFor: '适合第一次系统体验济州，希望兼顾地标、自然、食物和节奏的人。',
  },
  'ext-best-seasons': {
    status: 'editorial-guidance',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [officialGuidebookUrl],
    hours: '季节选择不是开放时间问题，而是天气、风、花期、海况和人流的组合。',
    transport:
      '旺季自驾和住宿更需要提前规划；冬季和风雨天更依赖备用室内/低海拔方案。',
    duration: '用于决定出行月份和路线预期，建议在订机票住宿前先看。',
    cautions: [
      '春秋更均衡，但也更容易遇到热门日期和价格上浮。',
      '夏季适合海岸氛围，但热、雨和台风风险需要备用方案。',
      '冬季更安静，但风和关闭/缩短时段会影响体验。',
    ],
    bestFor: '适合还没定日期、需要在天气、人流、预算和活动之间取舍的人。',
  },
  'ext-travel-tips': {
    status: 'editorial-guidance',
    lastVerified: lastTravelGuideVerification,
    sourceUrls: [officialGuidebookUrl],
    transport:
      '济州行程质量高度依赖交通假设；自驾、包车、公交会直接改变可行景点数量。',
    duration: '作为全程规划检查清单使用，每天出发前也可以快速复核。',
    cautions: [
      '地图距离不等于实际体验时间，停车、步行、排队和天气都会放大耗时。',
      '风雨天优先保护舒适度，不要硬追海边和高处景点。',
      '带老人儿童时，把厕所、坡道、台阶和休息点纳入路线。',
      '热门餐厅、Udo 船班、Hallasan 预约都不适合临时赌运气。',
    ],
    bestFor: '适合把视觉路线转成真实行程前的最后一次风险检查。',
  },
}

const defaultSafeZones: SafeZone[] = [
  {
    id: 'breadcrumb-top',
    purpose: 'breadcrumb',
    x: 0.04,
    y: 0.05,
    w: 0.34,
    h: 0.07,
  },
  {
    id: 'content-right',
    purpose: 'content-panel',
    x: 0.7,
    y: 0.12,
    w: 0.25,
    h: 0.58,
  },
  {
    id: 'speaker-bottom',
    purpose: 'speaker-notes',
    x: 0.04,
    y: 0.76,
    w: 0.45,
    h: 0.16,
  },
]

function withContentPanelSafeZone(
  id: string,
  x: number,
  y: number,
  w: number,
  h: number,
): SafeZone[] {
  return [
    ...defaultSafeZones.filter(
      (safeZone) => safeZone.purpose !== 'content-panel',
    ),
    {
      id,
      purpose: 'content-panel',
      x,
      y,
      w,
      h,
    },
  ]
}

function ellipseHotspot(
  id: string,
  label: string,
  targetSceneId: string,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  tooltip: string,
  focus: [number, number],
): Hotspot {
  return {
    id,
    label,
    targetSceneId,
    shape: 'ellipse',
    ellipse: { cx, cy, rx, ry },
    tooltip,
    hoverStyle: 'glow',
    presenterHint: `Use ${label} to branch deeper into the atlas.`,
    transitionHint: {
      type: 'zoom-in-to-hotspot',
      focus,
      scale: 1.65,
      duration: 650,
      targetEntry: 'soft-reveal',
    },
  }
}

function polygonHotspot(
  id: string,
  label: string,
  targetSceneId: string,
  points: [number, number][],
  tooltip: string,
  focus: [number, number],
): Hotspot {
  return {
    id,
    label,
    targetSceneId,
    shape: 'polygon',
    points,
    tooltip,
    hoverStyle: 'outline',
    presenterHint: `Branch from the world view into ${label}.`,
    transitionHint: {
      type: 'zoom-in-to-hotspot',
      focus,
      scale: 1.8,
      duration: 700,
      targetEntry: 'focus-reveal',
    },
  }
}

function createScene(config: {
  id: string
  title: string
  type: SceneNode['type']
  mainlineIndex?: number
  parentSceneId?: string
  path: string[]
  summary: string
  corePoint: string
  visualIntent: string
  presenterNotes: string
  talkingPoints: string[]
  hotspots?: Hotspot[]
  nextMainlineId?: string
  previousMainlineId?: string
  primaryReturnId?: string
  overviewReturnId?: string
  recommendedNextIds?: string[]
  safeZones?: SafeZone[]
  enter?: SceneNode['transition']['enter']
  exit?: SceneNode['transition']['exit']
  parentAnchor?: SceneNode['parentAnchor']
}): SceneNode {
  const assetPaths = getSceneAssetPaths(config.id)

  return {
    id: config.id,
    title: config.title,
    type: config.type,
    mainlineIndex: config.mainlineIndex,
    parentSceneId: config.parentSceneId,
    path: config.path,
    summary: config.summary,
    corePoint: config.corePoint,
    visual: {
      background: assetPaths.background,
	      foreground: assetPaths.foreground,
	      ambient: assetPaths.ambient,
	      thumbnail: assetPaths.thumbnail,
	      safeZones: config.safeZones ?? defaultSafeZones,
	      visualIntent: config.visualIntent,
	    },
    content: {
      audienceTitle: config.title,
      audienceSummary: config.summary,
      presenterNotes: config.presenterNotes,
      talkingPoints: config.talkingPoints,
      transitionLine:
        config.type === 'extension'
          ? `We are entering ${config.title} as a prepared branch from the wider Jeju atlas.`
          : `This scene advances the mainline atlas from ${config.title}.`,
      travelGuide: travelGuides[config.id],
    },
    hotspots: config.hotspots ?? [],
    navigation: {
      nextMainlineId: config.nextMainlineId,
      previousMainlineId: config.previousMainlineId,
      primaryReturnId: config.primaryReturnId,
      overviewReturnId: config.overviewReturnId,
      recommendedNextIds: config.recommendedNextIds ?? [],
    },
    transition: {
      enter: config.enter ?? 'soft-crossfade',
      exit: config.exit ?? 'zoom-out-to-parent',
    },
    parentAnchor: config.parentAnchor,
    metadata: {
      status: 'reviewed',
      version: '1.0.0',
      lastUpdated: '2026-05-02',
    },
  }
}

const overviewHotspots = [
  polygonHotspot(
    'hs-hallasan-overview',
    'Hallasan',
    'ext-hallasan',
	    [
	      [0.39, 0.34],
	      [0.48, 0.25],
	      [0.57, 0.42],
	      [0.46, 0.55],
	      [0.34, 0.46],
	    ],
	    'Central volcanic mountain and spatial anchor of Jeju.',
	    [0.46, 0.4],
	  ),
  ellipseHotspot(
    'hs-seongsan-overview',
    'Seongsan Ilchulbong',
    'ext-seongsan',
	    0.79,
	    0.47,
	    0.09,
	    0.1,
	    'Eastern sunrise landmark and iconic coastal volcanic cone.',
	    [0.79, 0.47],
	  ),
  ellipseHotspot(
    'hs-udo-overview',
    'Udo',
    'ext-udo',
	    0.78,
	    0.31,
	    0.05,
	    0.04,
	    'Satellite island with a slower coastal rhythm.',
	    [0.78, 0.31],
	  ),
  ellipseHotspot(
    'hs-waterfalls-overview',
    'Waterfalls',
    'ext-waterfalls',
	    0.5,
	    0.59,
	    0.055,
	    0.075,
	    'Lush south-coast waterfall belt and subtropical scenery.',
	    [0.5, 0.59],
	  ),
  ellipseHotspot(
    'hs-market-overview',
    'Dongmun Market',
    'ext-dongmun-market',
    0.17,
    0.48,
    0.09,
    0.08,
    'Jeju City market node for urban food energy.',
    [0.17, 0.48],
  ),
  ellipseHotspot(
    'hs-food-overview',
    'Food',
    'ext-food',
    0.72,
    0.7,
    0.1,
    0.08,
    'Black pork, seafood, citrus, and memorable dining atmosphere.',
    [0.72, 0.7],
  ),
]

const scenes: SceneNode[] = [
  createScene({
    id: 'cover-overview',
    title: 'Jeju Overview',
    type: 'mainline',
    mainlineIndex: 1,
    path: ['Jeju Atlas', 'Overview'],
    summary:
      'Opening atlas scene that frames Jeju as one connected, explorable miniature world.',
    corePoint:
      'Jeju should be introduced as a navigable world first, then explained through branches.',
    visualIntent:
      'A premium pixel-art world view of Jeju with volcanic center, coastal edges, market hints, and route-ready landmarks.',
    presenterNotes:
      'Open by inviting the audience to read the island visually before speaking through any itinerary.',
	    talkingPoints: [
	      'Jeju is compact, but it contains multiple landscape logics.',
	      'This prototype behaves like a visual browser rather than a slide deck.',
	      'Use hotspots to branch into the parts the audience cares about most.',
	    ],
	    hotspots: overviewHotspots,
	    safeZones: withContentPanelSafeZone(
	      'content-panel-cover-ocean',
	      0.76,
	      0.11,
	      0.2,
	      0.36,
	    ),
	    nextMainlineId: 'spatial-structure',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['spatial-structure', 'ext-hallasan', 'ext-seongsan'],
    enter: 'soft-crossfade',
    exit: 'zoom-out-to-parent',
  }),
  createScene({
    id: 'spatial-structure',
    title: 'Spatial Structure',
    type: 'mainline',
    mainlineIndex: 2,
    path: ['Jeju Atlas', 'Spatial Structure'],
    summary:
      'Geography-led scene showing how mountain center, coastal edges, and ring-road logic shape the island.',
    corePoint:
      'Jeju travel makes sense once the audience understands the island as a center-periphery system.',
    visualIntent:
      'Simplified but atmospheric regional atlas view with Hallasan massing and directional movement logic.',
    presenterNotes:
      'Use this scene to explain why travel time, region clustering, and route discipline matter.',
    talkingPoints: [
      'Hallasan anchors the entire island.',
      'Coastal circulation is easier to explain than inland traversal.',
      'Geography naturally produces itinerary clusters.',
    ],
    hotspots: [
      ellipseHotspot(
        'hs-hallasan-structure',
        'Central Mountain Core',
        'ext-hallasan',
	        0.46,
	        0.33,
	        0.13,
	        0.16,
	        'Mountain-centered structure that shapes movement and identity.',
	        [0.46, 0.33],
	      ),
      ellipseHotspot(
        'hs-east-structure',
        'East Coast',
        'ext-seongsan',
	        0.79,
	        0.51,
	        0.1,
	        0.11,
	        'Eastern coastline clustered around sunrise and volcanic forms.',
	        [0.79, 0.51],
	      ),
      ellipseHotspot(
        'hs-udo-structure',
        'Udo Link',
        'ext-udo',
	        0.85,
	        0.29,
	        0.05,
	        0.05,
	        'Satellite island link for ferry-based detours.',
	        [0.85, 0.29],
	      ),
      ellipseHotspot(
        'hs-cliffs-structure',
        'Geological Coast',
        'ext-jusangjeolli',
        0.18,
        0.65,
        0.12,
        0.12,
        'Coastal geology where volcanic structure becomes visible.',
        [0.18, 0.65],
      ),
      ellipseHotspot(
        'hs-waterfalls-structure',
        'South Scenic Belt',
        'ext-waterfalls',
        0.5,
        0.78,
        0.1,
        0.08,
        'Southern scenic belt with lush waterfall pockets.',
        [0.5, 0.78],
      ),
	    ],
	    safeZones: withContentPanelSafeZone(
	      'content-panel-structure-east-ocean',
	      0.78,
	      0.09,
	      0.19,
	      0.34,
	    ),
	    nextMainlineId: 'core-sight-map',
    previousMainlineId: 'cover-overview',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['core-sight-map', 'ext-hallasan', 'ext-jusangjeolli'],
    enter: 'pan',
  }),
  createScene({
    id: 'core-sight-map',
    title: 'Core Sight Map',
    type: 'mainline',
    mainlineIndex: 3,
    path: ['Jeju Atlas', 'Core Sights'],
    summary:
      'Branch hub scene showing how signature landmarks, culture, and food form experience clusters.',
    corePoint:
      'Jeju is best understood as a network of experiences rather than one iconic stop.',
    visualIntent:
      'Dense atlas map with landmark clusters and thematic zones that invite branch exploration.',
    presenterNotes:
      'This is the strongest branching page. Use it to adapt the presentation live without losing narrative clarity.',
    talkingPoints: [
      'Nature, culture, and food should appear in one integrated map.',
      'Branching works best from scenes with clear cluster logic.',
      'Landmarks are entry points into a broader island system.',
    ],
    hotspots: [
      ellipseHotspot(
        'hs-hallasan-core',
        'Hallasan',
        'ext-hallasan',
	        0.42,
	        0.27,
	        0.1,
	        0.13,
	        'The central mountain remains the island anchor.',
	        [0.42, 0.27],
	      ),
      ellipseHotspot(
        'hs-seongsan-core',
        'Seongsan Ilchulbong',
        'ext-seongsan',
	        0.77,
	        0.49,
	        0.09,
	        0.11,
	        'A landmark that instantly explains Jeju’s eastern identity.',
	        [0.77, 0.49],
	      ),
      ellipseHotspot(
        'hs-udo-core',
        'Udo',
        'ext-udo',
	        0.76,
	        0.27,
	        0.05,
	        0.04,
	        'A slower island sub-world reached by ferry.',
	        [0.76, 0.27],
	      ),
      ellipseHotspot(
        'hs-jusangjeolli-core',
        'Jusangjeolli Cliffs',
        'ext-jusangjeolli',
	        0.12,
	        0.63,
	        0.1,
	        0.12,
	        'Basalt columns where geology becomes architectural.',
	        [0.12, 0.63],
	      ),
      ellipseHotspot(
        'hs-waterfalls-core',
	        'Waterfalls',
	        'ext-waterfalls',
	        0.44,
	        0.8,
	        0.09,
	        0.08,
	        'Lush scenic contrast to the harsher coast.',
	        [0.44, 0.8],
	      ),
      ellipseHotspot(
        'hs-culture-core',
	        'Jeju Culture',
	        'ext-jeju-culture',
	        0.25,
	        0.6,
	        0.08,
	        0.08,
	        'Stone walls, symbols, and island identity textures.',
	        [0.25, 0.6],
	      ),
      ellipseHotspot(
        'hs-food-core',
        'Food',
        'ext-food',
	        0.74,
	        0.7,
	        0.11,
	        0.08,
	        'Food as atmosphere, memory, and regional identity.',
	        [0.74, 0.7],
	      ),
      ellipseHotspot(
        'hs-market-core',
        'Dongmun Market',
        'ext-dongmun-market',
	        0.18,
	        0.42,
	        0.08,
	        0.08,
	        'Urban market density within the wider island atlas.',
	        [0.18, 0.42],
	      ),
	    ],
	    safeZones: withContentPanelSafeZone(
	      'content-panel-core-sight-ocean',
	      0.77,
	      0.09,
	      0.2,
	      0.35,
	    ),
	    nextMainlineId: 'recommended-routes',
    previousMainlineId: 'spatial-structure',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['recommended-routes', 'ext-seongsan', 'ext-food'],
    enter: 'zoom-in',
  }),
  createScene({
    id: 'recommended-routes',
    title: 'Recommended Routes',
    type: 'mainline',
    mainlineIndex: 4,
    path: ['Jeju Atlas', 'Recommended Routes'],
    summary:
      'Route-planning scene translating the atlas into focused one-day and balanced three-day movement logic.',
    corePoint:
      'A strong Jeju route is built around pacing, regional grouping, and restraint rather than trying to collect every landmark.',
    visualIntent:
      'Route overlay scene with directional traces, timing zones, coastal movement, and itinerary rhythm cues.',
    presenterNotes:
      'Use this page to move from inspiration into planning. Frame route design as the moment where the atlas becomes useful: the audience should see that Jeju is large enough to punish over-planning, but structured enough to make elegant routes possible.',
    talkingPoints: [
      'A one-day route should choose one strong slice of Jeju instead of pretending the whole island can be absorbed at once.',
      'A three-day route can balance east-coast icons, Hallasan-centered geography, south-coast scenery, and city or food experiences.',
      'Good pacing protects the trip: fewer rushed transfers means more time to actually feel the island.',
      'Route design is where visual curiosity becomes travel intelligence.',
    ],
    hotspots: [
      ellipseHotspot(
        'hs-one-day-route',
        'One-day Route',
        'ext-one-day-route',
        0.27,
        0.53,
        0.18,
        0.2,
        'A disciplined short-stay route for one strong Jeju slice.',
        [0.27, 0.53],
      ),
      ellipseHotspot(
        'hs-three-day-route',
        'Three-day Route',
        'ext-three-day-route',
        0.62,
        0.5,
        0.21,
        0.27,
        'A balanced route that allows scenery, food, and pacing.',
        [0.62, 0.5],
      ),
      ellipseHotspot(
        'hs-best-season-route',
        'Best Seasons',
        'ext-best-seasons',
        0.18,
        0.3,
        0.1,
        0.075,
        'Season changes whether routes feel open, windy, floral, or crowded.',
        [0.18, 0.3],
      ),
    ],
    nextMainlineId: 'travel-advice-summary',
    previousMainlineId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: [
      'travel-advice-summary',
      'ext-one-day-route',
      'ext-three-day-route',
    ],
    enter: 'route-trace',
  }),
  createScene({
    id: 'travel-advice-summary',
    title: 'Travel Advice Summary',
    type: 'mainline',
    mainlineIndex: 5,
    path: ['Jeju Atlas', 'Travel Advice'],
    summary:
      'Closing summary scene that converts scenic inspiration into season, pacing, weather, and transport judgment.',
    corePoint:
      'The best Jeju trip is not defined by one perfect season or one perfect checklist, but by matching expectations to weather, distance, and travel rhythm.',
    visualIntent:
      'Calm closing atlas scene with seasonal mood zones, transport cues, weather awareness, and practical decision-making energy.',
    presenterNotes:
      'End by helping the audience make decisions, not just admire places. The close should feel useful and reassuring: Jeju is easier to plan when travelers understand season tradeoffs, wind, distances, and when to slow down.',
    talkingPoints: [
      'There is no universal best season: spring, summer, autumn, and winter each change the mood and tradeoffs of the island.',
      'Wind, rain, distance, and parking or transport choices can shape the day as much as the attraction list.',
      'A smoother trip usually comes from grouping nearby experiences and leaving space for weather changes.',
      'The goal is not to finish the map; it is to leave with a clear, memorable version of Jeju.',
    ],
    hotspots: [
      ellipseHotspot(
        'hs-best-seasons-advice',
        'Best Seasons',
        'ext-best-seasons',
        0.24,
        0.54,
        0.25,
        0.3,
        'Seasonal guidance for bloom, greenery, weather, and crowd tradeoffs.',
        [0.24, 0.54],
      ),
      ellipseHotspot(
        'hs-travel-tips-advice',
        'Travel Tips',
        'ext-travel-tips',
        0.61,
        0.67,
        0.2,
        0.18,
        'Practical transport and pacing advice for a smoother trip.',
        [0.61, 0.67],
      ),
    ],
    previousMainlineId: 'recommended-routes',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-best-seasons', 'ext-travel-tips', 'cover-overview'],
    enter: 'soft-crossfade',
    exit: 'fade',
  }),
  createScene({
    id: 'ext-hallasan',
    title: 'Hallasan',
    type: 'extension',
    parentSceneId: 'spatial-structure',
    path: ['Jeju Atlas', 'Spatial Structure', 'Hallasan'],
    summary:
      'Prepared branch focused on Hallasan as Jeju’s geographic and emotional center.',
    corePoint:
      'Hallasan explains both the map logic and the emotional identity of Jeju.',
    visualIntent:
      'Close-up mountain world with crater cues, trail lines, cloud shifts, and clear altitude storytelling.',
    presenterNotes:
      'Use this scene to explain that Jeju is not a flat beach island and that elevation changes both mood and movement.',
    talkingPoints: [
      'The mountain is central in both map structure and memory.',
      'Elevation and weather shape the travel experience.',
      'Hallasan gives the island vertical drama.',
    ],
    parentAnchor: {
      sourceHotspotId: 'hs-hallasan-structure',
      parentAnchorDescription:
        'In the parent Spatial Structure scene, Hallasan appears as the dominant central mountain mass with a broad volcanic silhouette, a bright summit zone, a crater-like crown, and descending green belts that organize the whole island around it. The surrounding routes and terrain all imply that the island radiates outward from this elevated core.',
      visualContinuityRequirements: [
        'Preserve Hallasan as a central volcanic mass, not a generic alpine mountain.',
        'Keep the same warm daylight palette, coastal-blue horizon logic, and 2.5D atlas perspective.',
        'Preserve the summit-crater identity and the sense that lower green belts descend from the mountain core.',
        'Make the child scene feel like a closer camera move into the same mountain object seen in the parent scene.',
      ],
      childExpansionPlan: [
        'Expand the crater basin into a readable summit destination.',
        'Reveal trail logic, altitude bands, shelters, and small hikers without changing the mountain identity.',
        'Preserve the relationship between upper rock, middle forest, and lower routes.',
        'Leave a calm side zone so the collapsed panel does not cover the summit form.',
      ],
      imageReferencePlan: {
        useAnchorCrop: true,
        cropPath:
          '/assets/anchor-crops/spatial-structure/hs-hallasan-structure.png',
      },
    },
    primaryReturnId: 'spatial-structure',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['core-sight-map', 'ext-seongsan'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-seongsan',
    title: 'Seongsan Ilchulbong',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Seongsan Ilchulbong'],
    summary:
      'Prepared branch for Jeju’s eastern volcanic icon and sunrise-facing landform.',
    corePoint:
      'Seongsan works because its silhouette instantly communicates place.',
    visualIntent:
      'Coastal tuff cone world with sea edge, stair logic, and sunrise atmosphere.',
    presenterNotes:
      'Explain why this landmark is visually memorable and why it anchors the eastern coast so strongly.',
    talkingPoints: [
      'Seongsan is one of the clearest single-form landmarks in Jeju.',
      'Its location amplifies sunrise and east-coast identity.',
      'The branch should feel like a closer look at the same world.',
    ],
    parentAnchor: {
      sourceHotspotId: 'hs-seongsan-core',
      parentAnchorDescription:
        'In the parent Core Sight Map scene, Seongsan Ilchulbong appears on the right side as a distinct tuff-cone crater beside bright coastal water and a narrow shoreline edge. It reads as an eastern volcanic cone with a clear bowl shape, sea contact, and open sky around it.',
      visualContinuityRequirements: [
        'Preserve the same crater silhouette, coastline relationship, and east-coast orientation visible in the parent scene.',
        'Keep the same daylight direction, blue-water palette, and atlas-scale visual language.',
        'Do not redesign Seongsan into a different hill or a cinematic postcard scene.',
        'Make the child scene feel like the camera zoomed into the exact eastern cone from the parent map.',
      ],
      childExpansionPlan: [
        'Expand the crater rim into a readable ascent and summit world.',
        'Reveal path logic, rim texture, and small visitor scale details.',
        'Keep the surrounding sea edge present so the landmark still feels coastal.',
        'Reserve a calmer side for the collapsed panel without weakening the cone silhouette.',
      ],
      imageReferencePlan: {
        useAnchorCrop: true,
        cropPath: '/assets/anchor-crops/core-sight-map/hs-seongsan-core.png',
      },
    },
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-udo', 'recommended-routes'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-udo',
    title: 'Udo',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Udo'],
    summary:
      'Prepared branch for Udo as a slower ferry-linked satellite island experience.',
    corePoint:
      'Udo changes the rhythm of Jeju travel rather than simply adding another stop.',
    visualIntent:
      'Satellite island scene with ring-road coastline, ferry arrival cues, bikes, low hills, bright water, and open field calm.',
    presenterNotes:
      'Position Udo as a pace shift and a world-within-the-world. The branch should help the audience feel why a short ferry crossing changes the day: movement slows down, the coastline becomes more intimate, and bikes or scooters make the island feel loopable.',
    talkingPoints: [
      'Udo is best introduced as a smaller island rhythm rather than another landmark checklist.',
      'The ferry link makes the experience feel intentionally separate from the main island.',
      'A ring road, bikes, beaches, and fields give the branch a slow exploratory tempo.',
      'This scene should feel like zooming into the small satellite island visible near the eastern coast.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-seongsan', 'recommended-routes'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-jusangjeolli',
    title: 'Jusangjeolli Cliffs',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Jusangjeolli Cliffs'],
    summary:
      'Prepared branch revealing volcanic geology through basalt-column cliffs and wave impact.',
    corePoint:
      'Jusangjeolli makes Jeju’s volcanic history legible as visible form.',
    visualIntent:
      'Basalt cliff-edge scene where repeating column geometry, white surf, dark stone, and viewing scale carry the story.',
    presenterNotes:
      'Let the audience read volcanic history through texture, repetition, and coast impact. This page should feel almost architectural, but still natural: the point is not to lecture geology, but to show how lava history becomes a coastline you can stand beside.',
    talkingPoints: [
      'The repeating basalt columns make geology visible at a glance.',
      'Surf against dark volcanic stone gives the scene energy and scale.',
      'This branch balances the softer scenic pages with a sharper structural landscape.',
      'The image should stay readable enough that the audience can understand the form before hearing the explanation.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-waterfalls', 'recommended-routes'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-waterfalls',
    title: 'Waterfalls',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Waterfalls'],
    summary:
      'Prepared branch for Jeju’s lush waterfall scenery, mist, basalt ravines, and subtropical contrast.',
    corePoint:
      'Water-rich landscapes show a softer side of Jeju beyond basalt cliffs and volcanic icons.',
    visualIntent:
      'Waterfall scene with vertical white flow, mist, dark volcanic rock, dense green foliage, pools, and small viewing paths.',
    presenterNotes:
      'Use this branch to widen the audience’s sense of Jeju’s visual range. After mountains, cliffs, and coastlines, the waterfall page should introduce humidity, shade, mist, and a more intimate walking pace.',
    talkingPoints: [
      'Waterfalls diversify the island image beyond beaches and volcanic cones.',
      'Dark basalt and bright white water keep the volcanic identity present.',
      'Dense greenery gives the route a softer, more sheltered atmosphere.',
      'This page is useful for explaining why Jeju routes should mix scenic textures rather than repeat the same kind of stop.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-jusangjeolli', 'travel-advice-summary'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-jeju-culture',
    title: 'Jeju Culture',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Jeju Culture'],
    summary:
      'Prepared branch focused on cultural symbols, island materials, and everyday Jeju identity.',
    corePoint:
      'Jeju should feel culturally distinct, not just scenically attractive.',
    visualIntent:
      'Cultural village scene with basalt stone walls, dol hareubang, low houses, citrus, coastal wind, and lived island textures.',
    presenterNotes:
      'Keep the branch grounded in symbolic and environmental identity instead of turning it into a history lecture. The strongest version of this page shows culture as part of the landscape: stone walls, wind, houses, citrus, and small daily-life details.',
    talkingPoints: [
      'Symbols need to feel lived-in, not decorative only.',
      'Stone, wind, citrus, and low village forms help Jeju feel materially distinct.',
      'Culture should sit inside the atlas, not apart from it.',
      'This branch makes the island feel inhabited rather than purely scenic.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-dongmun-market', 'ext-food'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-food',
    title: 'Food',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Food'],
    summary:
      'Prepared branch for Jeju food memory through black pork, seafood, citrus, and atmosphere.',
    corePoint:
      'Food should read as place experience, not menu enumeration.',
    visualIntent:
      'Warm dining scene with grill glow, seafood textures, market energy, and citrus accents.',
    presenterNotes:
      'Talk about sensory memory and regional identity rather than listing dishes.',
    talkingPoints: [
      'Food is one of the strongest memory anchors in travel.',
      'Atmosphere matters as much as specific dishes.',
      'This branch adds warmth to the atlas.',
    ],
    parentAnchor: {
      sourceHotspotId: 'hs-food-core',
      parentAnchorDescription:
        'In the parent Core Sight Map scene, the food region appears on the lower-right side as a circular dining and market cluster near the coast, with warm table colors, clustered dishes, and a lively island-edge atmosphere. It is not a single dish, but a compact social food district.',
      visualContinuityRequirements: [
        'Preserve the lower-right coastal placement, warm palette, and clustered dining identity from the parent scene.',
        'Keep the same Jeju atlas perspective and bright outdoor world rather than switching to a generic restaurant interior.',
        'Make the child scene feel like a closer look at the same food district, not a new menu collage.',
        'Retain food-as-atmosphere rather than food-as-labels.',
      ],
      childExpansionPlan: [
        'Expand the circular dining cluster into a readable food-world with black pork, seafood, citrus, tables, and pathways.',
        'Keep social energy and local place feeling stronger than individual dish cataloging.',
        'Use small visitors, serving areas, and circulation paths for scale.',
        'Leave enough calm edge space for the collapsed panel.',
      ],
      imageReferencePlan: {
        useAnchorCrop: true,
        cropPath: '/assets/anchor-crops/core-sight-map/hs-food-core.png',
      },
    },
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-dongmun-market', 'recommended-routes'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-dongmun-market',
    title: 'Dongmun Market',
    type: 'extension',
    parentSceneId: 'core-sight-map',
    path: ['Jeju Atlas', 'Core Sights', 'Dongmun Market'],
    summary:
      'Prepared branch for Dongmun Market as a dense urban food, produce, and walking node.',
    corePoint:
      'Urban market density gives the atlas an essential local contrast to Jeju’s open landscapes.',
    visualIntent:
      'Market district scene with roof rhythm, warm stall light, seafood and citrus cues, packaged produce, narrow aisles, and pedestrian energy.',
    presenterNotes:
      'Use this scene to contrast urban density with Jeju’s open landscapes. Dongmun should feel practical and atmospheric at the same time: a place to eat, buy, wander, and feel local movement.',
    talkingPoints: [
      'The market condenses local energy into a compact walking environment.',
      'Food, produce, souvenirs, and city movement overlap here.',
      'This branch helps balance nature-heavy storytelling with an urban/local node.',
      'Dongmun is practical, social, and atmospheric at once.',
    ],
    primaryReturnId: 'core-sight-map',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-food', 'travel-advice-summary'],
    enter: 'zoom-in-to-hotspot',
  }),
  createScene({
    id: 'ext-one-day-route',
    title: 'One-day Route',
    type: 'extension',
    parentSceneId: 'recommended-routes',
    path: ['Jeju Atlas', 'Recommended Routes', 'One-day Route'],
    summary:
      'Prepared route branch for a disciplined one-day Jeju experience that chooses focus over coverage.',
    corePoint:
      'A short stay becomes enjoyable only when the route remains geographically coherent.',
    visualIntent:
      'Tight route-atlas scene with compact movement, timing cues, rest points, and a clear sense of what is intentionally omitted.',
    presenterNotes:
      'Be explicit about tradeoffs. The strength of this route is discipline, not maximal coverage. The audience should feel that a good one-day route protects attention and energy by refusing to chase the whole island.',
    talkingPoints: [
      'One day requires choosing one coherent island slice.',
      'Too many stops weaken the island experience by turning it into transfers.',
      'A good route preserves energy, weather flexibility, and memory.',
      'This page should make restraint feel like a design choice, not a compromise.',
    ],
    primaryReturnId: 'recommended-routes',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-three-day-route', 'travel-advice-summary'],
    enter: 'route-trace',
  }),
  createScene({
    id: 'ext-three-day-route',
    title: 'Three-day Route',
    type: 'extension',
    parentSceneId: 'recommended-routes',
    path: ['Jeju Atlas', 'Recommended Routes', 'Three-day Route'],
    summary:
      'Prepared route branch for a balanced three-day Jeju itinerary with regional grouping and pacing.',
    corePoint:
      'Three days is enough time to combine scenery, food, and pacing without constant rushing.',
    visualIntent:
      'Multi-day route-atlas scene with three clear clusters, day-based grouping, rest rhythm, and balanced regional coverage.',
    presenterNotes:
      'Show how day sequencing can reduce travel friction while widening experience variety. This branch should make the atlas feel useful: east-coast icons, central geography, food, city, and coast can be grouped into a trip that breathes.',
    talkingPoints: [
      'Three days unlocks better rhythm because the route does not need to compress every experience into one day.',
      'The route can balance east, central, south/coastal, and urban/food zones.',
      'Grouping nearby experiences reduces wasted transfers.',
      'This branch shows how the atlas becomes planning intelligence.',
    ],
    primaryReturnId: 'recommended-routes',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-best-seasons', 'travel-advice-summary'],
    enter: 'route-trace',
  }),
  createScene({
    id: 'ext-best-seasons',
    title: 'Best Seasons',
    type: 'extension',
    parentSceneId: 'travel-advice-summary',
    path: ['Jeju Atlas', 'Travel Advice', 'Best Seasons'],
    summary:
      'Prepared seasonal guidance branch showing how Jeju’s mood, activities, crowds, and weather tradeoffs change across the year.',
    corePoint:
      'The best Jeju season depends on desired atmosphere, activity, and tolerance for wind or crowds.',
    visualIntent:
      'Unified seasonal atlas scene with blossom, greenery, clear autumn light, wind, citrus, and coastal weather cues.',
    presenterNotes:
      'Avoid one-size-fits-all advice and instead help the audience map expectations to seasons. The point is not to name one perfect month, but to show that every season changes the island’s mood and planning tradeoffs.',
    talkingPoints: [
      'Season changes the emotional tone of the island.',
      'Weather, wind, crowds, and activity fit matter as much as scenery.',
      'Spring, summer, autumn, and winter should feel like different versions of Jeju rather than ranked options.',
      'This branch helps the summary page become actionable.',
    ],
    primaryReturnId: 'travel-advice-summary',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['ext-travel-tips', 'cover-overview'],
    enter: 'soft-crossfade',
  }),
  createScene({
    id: 'ext-travel-tips',
    title: 'Travel Tips',
    type: 'extension',
    parentSceneId: 'travel-advice-summary',
    path: ['Jeju Atlas', 'Travel Advice', 'Travel Tips'],
    summary:
      'Prepared advice branch covering transport assumptions, weather, pacing, walking effort, and trip comfort.',
    corePoint:
      'Practical expectations protect the quality of the Jeju experience.',
    visualIntent:
      'Utility-focused atlas scene with route fragments, transport cues, weather exposure, luggage, rest points, and restrained guidance framing.',
    presenterNotes:
      'Keep this branch concise and useful so the audience leaves more prepared, not more overwhelmed. The tone should be reassuring: small practical expectations can prevent the most common friction points.',
    talkingPoints: [
      'Transport assumptions shape the trip more than many visitors expect.',
      'Wind, rain, walking distance, and parking or booking timing affect comfort.',
      'Grouping nearby experiences protects the day from unnecessary friction.',
      'Good tips increase trust in the visual presentation because the atlas becomes usable.',
    ],
    primaryReturnId: 'travel-advice-summary',
    overviewReturnId: 'cover-overview',
    recommendedNextIds: ['cover-overview', 'recommended-routes'],
    enter: 'soft-crossfade',
    exit: 'fade',
  }),
]

const graphSource: SceneGraph = {
  project: {
    id: 'jeju-pixelflip-pre',
    title: 'Jeju PixelFlip Pre',
    version: '0.1.0',
    description:
      'Prepared explorable pixel-art presentation prototype about Jeju Island.',
  },
  scenes,
}

export const sceneGraph = parseSceneGraph(graphSource)

export function getSceneById(sceneId: string) {
  return sceneGraph.scenes.find((scene) => scene.id === sceneId)
}
