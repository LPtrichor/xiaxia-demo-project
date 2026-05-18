import type { Article, Category } from '@/types'

export const seedArticles: Article[] = [
  // === 领导讲话 ===
  {
    id: 'ls-001', title: '在2026年全院工作会议上的讲话', subtitle: '——深入学习贯彻党的二十大精神',
    summary: '本文是在2026年全院工作会议上所作的重要讲话，重点围绕检察工作的新形势、新任务进行部署。',
    content: '<p>同志们：</p><p>今天我们召开全院工作会议，主要任务是深入学习贯彻党的二十大精神，总结过去一年工作，安排部署今年各项任务。</p><p>过去一年，在院党组的坚强领导下，全院干警团结协作、锐意进取，各项工作取得了显著成效。刑事检察工作稳步推进，民事检察监督持续加强，公益诉讼检察取得新突破。</p><p>今年，我们要紧紧围绕"高质效办好每一个案件"的基本要求，重点抓好以下几方面工作：一是强化政治引领，坚持党对检察工作的绝对领导；二是聚焦主责主业，全面提升法律监督质效；三是深化改革创新，推动检察工作高质量发展。</p><p>同志们，新时代赋予新使命，新征程呼唤新担当。让我们更加紧密地团结在党中央周围，凝心聚力、真抓实干，为推动检察工作现代化作出新的更大贡献！</p>',
    category: 'leader-speech', author: '检察长', publishDate: '2026-05-15T09:00:00Z', viewCount: 342, isTop: true, status: 'published',
  },
  {
    id: 'ls-002', title: '在党建工作专题会议上的发言',
    summary: '围绕检察机关党建与业务深度融合进行专题发言，探讨新形势下党建工作的新思路。',
    content: '<p>各位同志：今天，我们召开党建工作专题会议，主要任务是研究部署新形势下检察机关党建工作。</p><p>党建工作是检察工作的生命线。我们要坚持把政治建设摆在首位，以党的政治建设统领检察业务工作。</p><p>一是加强理论武装，筑牢思想根基。二是夯实基层组织，发挥战斗堡垒作用。三是强化作风建设，打造过硬检察队伍。</p>',
    category: 'leader-speech', author: '副检察长', publishDate: '2026-05-10T14:00:00Z', viewCount: 189, isTop: false, status: 'published',
  },
  {
    id: 'ls-003', title: '在数字检察建设推进会上的讲话',
    summary: '部署数字检察建设工作，强调科技赋能检察业务。',
    content: '<p>同志们：数字检察是新时代检察工作的重要方向。我们要以大数据、人工智能等技术手段赋能法律监督，提升办案质效。</p><p>一要统一思想，深刻认识数字检察建设的重要意义。二要统筹规划，明确建设目标和实施路径。三要抓好落实，确保各项建设任务按期完成。</p>',
    category: 'leader-speech', author: '检察长', publishDate: '2026-04-28T10:00:00Z', viewCount: 156, isTop: false, status: 'published',
  },
  {
    id: 'ls-004', title: '在未成年人检察工作会议上的讲话',
    summary: '部署未成年人检察工作，强调保护未成年人合法权益。',
    content: '<p>同志们：未成年人检察工作是检察机关的重要职责。我们要坚持以最有利于未成年人为原则，全面落实未成年人司法保护。</p>',
    category: 'leader-speech', author: '副检察长', publishDate: '2026-04-15T09:30:00Z', viewCount: 128, isTop: false, status: 'published',
  },
  {
    id: 'ls-005', title: '在全院党风廉政建设大会上的讲话',
    summary: '强调党风廉政建设的重要性，部署全年廉政工作。',
    content: '<p>同志们：党风廉政建设事关检察事业全局。我们要坚持全面从严治党，以零容忍态度惩治腐败。</p>',
    category: 'leader-speech', author: '纪检组长', publishDate: '2026-03-20T10:00:00Z', viewCount: 201, isTop: false, status: 'published',
  },
  // === 部门动态 ===
  {
    id: 'dd-001', title: '我院成功办理首例生态环境公益诉讼案',
    summary: '近日，我院成功办理了全市首例生态环境领域民事公益诉讼案件，取得良好社会效果。',
    content: '<p>近日，我院民事行政检察部门成功办理了全市首例生态环境领域民事公益诉讼案件。该案涉及某企业违法排放污染物，造成周边生态环境严重损害。</p><p>我院在接到群众举报后，迅速成立专案组开展调查取证工作。经多方协调，最终促使涉事企业承担了全部生态修复费用共计120万元，并公开道歉。</p><p>该案的成功办理，彰显了检察机关在生态环境保护领域的担当，也为今后类似案件的办理积累了宝贵经验。</p>',
    category: 'dept-dynamic', author: '民行检察部', publishDate: '2026-05-14T16:00:00Z', viewCount: 267, isTop: true, status: 'published',
  },
  {
    id: 'dd-002', title: '刑事检察部开展"护企行动"专项工作',
    summary: '刑事检察部启动"护企行动"，依法保护民营企业合法权益。',
    content: '<p>为进一步优化法治化营商环境，我院刑事检察部近日启动"护企行动"专项工作，重点打击侵犯民营企业合法权益的各类犯罪。</p>',
    category: 'dept-dynamic', author: '刑事检察部', publishDate: '2026-05-12T10:00:00Z', viewCount: 143, isTop: false, status: 'published',
  },
  {
    id: 'dd-003', title: '公诉科组织开展模拟法庭练兵活动',
    summary: '提升公诉人出庭能力，公诉科组织开展了模拟法庭实战练兵。',
    content: '<p>为提升公诉人出庭公诉能力，近日，公诉科组织开展了模拟法庭实战练兵活动。活动选取一起典型刑事案件，由年轻检察官担任公诉人，资深检察官担任评委进行点评指导。</p>',
    category: 'dept-dynamic', author: '公诉科', publishDate: '2026-05-08T14:00:00Z', viewCount: 98, isTop: false, status: 'published',
  },
  {
    id: 'dd-004', title: '控告申诉检察窗口服务满意度提升至98%',
    summary: '我院控告申诉检察部门持续优化服务流程，群众满意度显著提升。',
    content: '<p>今年以来，我院控告申诉检察部门持续推进"一站式"服务建设，优化接访流程，提高服务效率，群众满意度提升至98%。</p>',
    category: 'dept-dynamic', author: '控申检察部', publishDate: '2026-04-25T09:00:00Z', viewCount: 87, isTop: false, status: 'published',
  },
  {
    id: 'dd-005', title: '检察技术部门完成信息化系统升级',
    summary: '检察业务信息化系统全面升级，办案效率大幅提升。',
    content: '<p>近日，我院检察技术部门完成了业务信息化系统的全面升级工作。新系统实现了案件管理、文书生成、数据统计等功能的智能化升级。</p>',
    category: 'dept-dynamic', author: '技术部', publishDate: '2026-04-10T11:00:00Z', viewCount: 76, isTop: false, status: 'published',
  },
  // === 学习培训 ===
  {
    id: 'tr-001', title: '2026年度检察业务培训计划发布',
    summary: '全院年度培训计划正式印发，涵盖业务理论、实务技能、信息化应用等多个领域。',
    content: '<p>为全面提升检察队伍业务能力，我院2026年度检察业务培训计划已正式印发。培训计划坚持问题导向、需求导向，注重理论与实务相结合。</p><p>全年计划举办各类培训班次20期，覆盖全院干警。培训内容涵盖刑事检察、民事检察、行政检察、公益诉讼检察四大检察业务，以及信息化应用、公文写作等通用技能。</p>',
    category: 'training', author: '政治部', publishDate: '2026-05-13T09:00:00Z', viewCount: 215, isTop: true, status: 'published',
  },
  {
    id: 'tr-002', title: '第一期青年检察官研修班顺利开班',
    summary: '30名青年骨干参加首期研修班，系统学习新修订法律法规。',
    content: '<p>近日，我院第一期青年检察官研修班正式开班。来自各业务部门的30名青年骨干参加了此次培训。</p>',
    category: 'training', author: '政治部', publishDate: '2026-05-06T10:00:00Z', viewCount: 134, isTop: false, status: 'published',
  },
  {
    id: 'tr-003', title: '邀请市院专家开展公益诉讼专题讲座',
    summary: '提升公益诉讼办案能力，邀请上级院专家来院授课。',
    content: '<p>为提升公益诉讼检察办案能力，我院邀请市检察院公益诉讼检察部门专家来院开展专题讲座。全院60余名干警参加了学习。</p>',
    category: 'training', author: '研究室', publishDate: '2026-04-20T14:00:00Z', viewCount: 89, isTop: false, status: 'published',
  },
  {
    id: 'tr-004', title: '信息化应用操作培训全员覆盖',
    summary: '新一代办案系统操作培训实现全员覆盖。',
    content: '<p>为确保新一代检察业务信息系统顺利上线，我院组织开展了全员信息化应用操作培训，确保每位干警熟练掌握系统操作。</p>',
    category: 'training', author: '技术部', publishDate: '2026-04-05T09:00:00Z', viewCount: 112, isTop: false, status: 'published',
  },
  {
    id: 'tr-005', title: '参加全省检察机关业务竞赛获佳绩',
    summary: '我院3名干警在全省业务竞赛中获奖。',
    content: '<p>在近日举行的全省检察机关业务竞赛中，我院3名干警凭借扎实的理论功底和出色的实务能力，分别荣获一、二、三等奖。</p>',
    category: 'training', author: '政治部', publishDate: '2026-03-25T16:00:00Z', viewCount: 178, isTop: false, status: 'published',
  },
  // === 文件下载 ===
  {
    id: 'fd-001', title: '关于印发《泗洪县人民检察院工作细则》的通知',
    summary: '新版工作细则已印发，请各部门下载学习并遵照执行。',
    content: '<p>各部门：现将《泗洪县人民检察院工作细则（2026年修订版）》印发给你们，请认真组织学习，严格遵照执行。</p><p>本次修订主要针对办案流程、文书规范、档案管理等方面进行了完善，请各部门结合实际抓好落实。</p>',
    category: 'file-download', author: '办公室', publishDate: '2026-05-16T08:00:00Z', viewCount: 198, isTop: true, status: 'published',
    attachments: [
      { id: 'att-001', name: '泗洪县人民检察院工作细则（2026年修订版）.pdf', url: '/files/work-rules-2026.pdf', size: '2.3MB', type: 'application/pdf' },
      { id: 'att-002', name: '工作细则修订说明.docx', url: '/files/work-rules-explanation.docx', size: '560KB', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    ],
  },
  {
    id: 'fd-002', title: '2026年第一季度检察业务数据统计表',
    summary: '第一季度各项检察业务数据汇总，供各部门参考。',
    content: '<p>现将2026年第一季度检察业务数据统计表予以发布，请各部门查阅。</p>',
    category: 'file-download', author: '案件管理部', publishDate: '2026-05-01T09:00:00Z', viewCount: 87, isTop: false, status: 'published',
    attachments: [
      { id: 'att-003', name: '2026年Q1业务数据统计.xlsx', url: '/files/q1-stats-2026.xlsx', size: '1.1MB', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    ],
  },
  {
    id: 'fd-003', title: '检察文书模板（2026版）',
    summary: '最新版检察文书模板，包含起诉书、不起诉决定书等常用文书。',
    content: '<p>为方便各部门规范制作检察文书，现将最新版文书模板予以发布。</p>',
    category: 'file-download', author: '法律政策研究室', publishDate: '2026-04-18T10:00:00Z', viewCount: 156, isTop: false, status: 'published',
    attachments: [
      { id: 'att-004', name: '起诉书模板.docx', url: '/files/template-indictment.docx', size: '180KB', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
      { id: 'att-005', name: '不起诉决定书模板.docx', url: '/files/template-non-indictment.docx', size: '165KB', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    ],
  },
  {
    id: 'fd-004', title: '党风廉政建设工作台账模板',
    summary: '统一党风廉政建设工作台账格式，便于各部门规范管理。',
    content: '<p>为规范党风廉政建设工作台账管理，现将统一模板予以发布。</p>',
    category: 'file-download', author: '纪检组', publishDate: '2026-03-15T09:00:00Z', viewCount: 65, isTop: false, status: 'published',
    attachments: [
      { id: 'att-006', name: '党风廉政工作台账模板.xlsx', url: '/files/integrity-ledger.xlsx', size: '890KB', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    ],
  },
  {
    id: 'fd-005', title: '检察宣传工作方案及素材包',
    summary: '年度检察宣传工作方案及配套宣传素材。',
    content: '<p>现将年度检察宣传工作方案及素材包予以发布，请各部门配合做好宣传工作。</p>',
    category: 'file-download', author: '政治部', publishDate: '2026-03-01T10:00:00Z', viewCount: 73, isTop: false, status: 'published',
    attachments: [
      { id: 'att-007', name: '检察宣传工作方案.pdf', url: '/files/propaganda-plan.pdf', size: '1.5MB', type: 'application/pdf' },
      { id: 'att-008', name: '宣传素材包.zip', url: '/files/propaganda-materials.zip', size: '15.2MB', type: 'application/zip' },
    ],
  },
  // === 规章制度 ===
  {
    id: 'rg-001', title: '泗洪县人民检察院案件管理办法',
    summary: '规范案件受理、流转、归档等全流程管理。',
    content: '<p>第一章 总则</p><p>第一条 为规范案件管理工作，提高办案效率，保障办案质量，根据《中华人民共和国人民检察院组织法》等有关规定，结合本院实际，制定本办法。</p><p>第二条 本办法适用于本院受理的刑事、民事、行政、公益诉讼等所有案件。</p><p>第二章 案件受理</p><p>第三条 案件管理部门负责统一受理各类案件，实行"统一入口、统一出口"。</p>',
    category: 'regulation', author: '案件管理部', publishDate: '2026-05-11T09:00:00Z', viewCount: 234, isTop: true, status: 'published',
  },
  {
    id: 'rg-002', title: '关于规范检察文书制作的规定',
    summary: '明确各类检察文书的制作规范和质量要求。',
    content: '<p>为进一步提升检察文书质量，规范文书制作，现就有关事项规定如下：</p><p>一、总体要求。检察文书制作应当遵循合法、规范、准确、及时的原则。</p><p>二、格式要求。统一使用最新版文书模板，不得擅自更改格式。</p>',
    category: 'regulation', author: '法律政策研究室', publishDate: '2026-04-22T10:00:00Z', viewCount: 145, isTop: false, status: 'published',
  },
  {
    id: 'rg-003', title: '考勤与请休假管理制度（2026修订）',
    summary: '修订后的考勤和请休假管理制度，自2026年4月1日起施行。',
    content: '<p>为进一步规范考勤与请休假管理，结合本院实际，对原制度进行了修订。</p><p>一、工作时间。实行标准工时制，工作日为周一至周五，上午8:30-12:00，下午14:00-17:30。</p><p>二、考勤方式。实行打卡考勤制度，每日上下午各打卡一次。</p>',
    category: 'regulation', author: '政治部', publishDate: '2026-03-28T09:00:00Z', viewCount: 312, isTop: false, status: 'published',
  },
  {
    id: 'rg-004', title: '涉案财物管理细则',
    summary: '规范涉案财物的查封、扣押、保管和处置流程。',
    content: '<p>为规范涉案财物管理，保护当事人合法权益，根据相关法律法规，制定本细则。</p>',
    category: 'regulation', author: '办公室', publishDate: '2026-03-10T10:00:00Z', viewCount: 98, isTop: false, status: 'published',
  },
  {
    id: 'rg-005', title: '信息安全保密管理规定',
    summary: '加强检察工作信息安全管理，防止泄密事件发生。',
    content: '<p>为加强我院信息安全保密管理，确保检察工作秘密安全，制定本规定。</p><p>一、涉密信息分级管理。按照"绝密""机密""秘密"三个等级进行分类管理。</p><p>二、计算机及网络使用管理。严禁在连接互联网的计算机上处理涉密信息。</p>',
    category: 'regulation', author: '技术部', publishDate: '2026-02-20T09:00:00Z', viewCount: 187, isTop: false, status: 'published',
  },
  // === 党建工作 ===
  {
    id: 'pb-001', title: '我院开展"学党史、强信念"主题党日活动',
    summary: '为庆祝建党105周年，我院组织开展了主题党日活动。',
    content: '<p>为深入学习贯彻党的二十大精神，庆祝建党105周年，我院党支部近日组织开展了"学党史、强信念"主题党日活动。</p><p>活动中，全体党员重温了入党誓词，参观了红色教育基地，并开展了党史知识竞赛。通过此次活动，进一步增强了党员的党性修养和责任担当。</p>',
    category: 'party-building', author: '机关党委', publishDate: '2026-05-17T10:00:00Z', viewCount: 289, isTop: true, status: 'published',
  },
  {
    id: 'pb-002', title: '党支部换届选举工作圆满完成',
    summary: '我院各党支部顺利完成换届选举，新一届支委会产生。',
    content: '<p>按照党章和基层党组织选举工作条例的规定，我院各党支部近日顺利完成了换届选举工作。</p>',
    category: 'party-building', author: '机关党委', publishDate: '2026-05-03T09:00:00Z', viewCount: 167, isTop: false, status: 'published',
  },
  {
    id: 'pb-003', title: '开展党员先锋岗评选活动',
    summary: '评选表彰在检察工作中表现突出的党员先锋。',
    content: '<p>为充分发挥党员先锋模范作用，我院启动了年度党员先锋岗评选活动。</p>',
    category: 'party-building', author: '机关党委', publishDate: '2026-04-12T10:00:00Z', viewCount: 134, isTop: false, status: 'published',
  },
  {
    id: 'pb-004', title: '廉政教育月系列活动总结',
    summary: '廉政教育月活动圆满结束，取得预期效果。',
    content: '<p>为期一个月的廉政教育月活动已圆满结束。活动期间，我院组织开展了廉政党课、警示教育、廉政谈话等系列工作。</p>',
    category: 'party-building', author: '纪检组', publishDate: '2026-04-01T14:00:00Z', viewCount: 156, isTop: false, status: 'published',
  },
  {
    id: 'pb-005', title: '党支部与社区结对共建签约仪式',
    summary: '我院党支部与XX社区签订结对共建协议。',
    content: '<p>近日，我院党支部与XX社区举行了结对共建签约仪式，双方将在党建、法治宣传、志愿服务等方面开展深度合作。</p>',
    category: 'party-building', author: '机关党委', publishDate: '2026-03-15T09:00:00Z', viewCount: 112, isTop: false, status: 'published',
  },
  // === 学习园地 ===
  {
    id: 'sg-001', title: '读书笔记推荐：《法治的细节》',
    summary: '推荐罗翔教授新作《法治的细节》，分享阅读心得。',
    content: '<p>《法治的细节》是罗翔教授的最新著作，本书通过一个个具体案例，深入浅出地讲解了法律精神和法治理念。</p><p>作为检察干警，阅读本书有助于我们更好地理解法治的内涵，提升法律思维能力。书中关于程序正义、罪刑法定等原则的论述，对我们的实际办案具有重要的指导意义。</p><p>推荐理由：通俗易懂、案例丰富、思想深刻。建议大家在繁忙的工作之余，静下心来读一读这本书。</p>',
    category: 'study-garden', author: '张三', publishDate: '2026-05-16T10:00:00Z', viewCount: 178, isTop: true, status: 'published',
  },
  {
    id: 'sg-002', title: '学习心得：数字时代检察工作的思考',
    summary: '结合工作实际，谈谈对数字检察的理解和认识。',
    content: '<p>随着信息技术的快速发展，数字检察已成为检察工作转型升级的重要方向。结合工作实际，我谈几点认识和体会。</p><p>首先，数字检察不是简单的技术升级，而是检察理念和办案模式的变革。其次，大数据应用可以极大提升法律监督的精准性。最后，我们要在推进数字检察的同时，注意保护当事人个人信息安全。</p>',
    category: 'study-garden', author: '李四', publishDate: '2026-05-09T14:00:00Z', viewCount: 123, isTop: false, status: 'published',
  },
  {
    id: 'sg-003', title: '经典案例分享：正当防卫的认定标准',
    summary: '通过典型案例，分析正当防卫认定的关键要素。',
    content: '<p>正当防卫是刑法中的重要制度。近年来，随着一系列热点案件的办理，正当防卫的认定标准受到了广泛关注。</p><p>本文结合最高检发布的指导性案例，分析正当防卫认定的关键要素：一是不法侵害的存在；二是防卫意图；三是防卫限度。</p>',
    category: 'study-garden', author: '王五', publishDate: '2026-04-26T09:00:00Z', viewCount: 198, isTop: false, status: 'published',
  },
  {
    id: 'sg-004', title: '公文写作技巧：检察文书的规范表达',
    summary: '分享检察文书写作中的常见问题和改进建议。',
    content: '<p>检察文书是检察机关行使法律监督职权的重要载体，文书质量直接关系到司法公信力。本文结合日常办案实践，总结了几点公文写作技巧。</p>',
    category: 'study-garden', author: '赵六', publishDate: '2026-04-08T10:00:00Z', viewCount: 145, isTop: false, status: 'published',
  },
  {
    id: 'sg-005', title: '读书角：本月好书推荐清单',
    summary: '院内读书角本月上架了一批新书，涵盖法律、文学、历史等领域。',
    content: '<p>院内读书角本月新上架图书20余册，涵盖法律专业、文学经典、历史人文等多个领域。欢迎各位同事前往借阅。</p><p>推荐书目：1.《民法典理解与适用》2.《乡土中国》3.《万历十五年》4.《检察制度的中国实践》</p>',
    category: 'study-garden', author: '办公室', publishDate: '2026-03-30T09:00:00Z', viewCount: 89, isTop: false, status: 'published',
  },
  // === 资料共享 ===
  {
    id: 'rs-001', title: '共享：2026年度法律汇编电子版',
    summary: '整理了2026年最新法律法规汇编，供大家学习参考。',
    content: '<p>为方便大家学习最新法律法规，我整理了2026年度法律汇编电子版，包含刑法修正案、民法典司法解释、刑事诉讼法最新修订内容等。</p><p>本资料仅供院内学习交流使用，请勿外传。</p>',
    category: 'resource-share', author: '研究室', publishDate: '2026-05-15T10:00:00Z', viewCount: 234, isTop: true, status: 'published',
    attachments: [
      { id: 'att-009', name: '2026年度法律汇编.pdf', url: '/files/law-compilation-2026.pdf', size: '8.5MB', type: 'application/pdf' },
    ],
  },
  {
    id: 'rs-002', title: '共享：优秀起诉书范本3篇',
    summary: '分享3篇获评优秀的起诉书范本，供参考学习。',
    content: '<p>以下是3篇在上级院评比中获评优秀的起诉书范本，涵盖盗窃、诈骗、危险驾驶三种常见罪名，供大家参考学习。</p>',
    category: 'resource-share', author: '公诉科', publishDate: '2026-05-07T14:00:00Z', viewCount: 167, isTop: false, status: 'published',
    attachments: [
      { id: 'att-010', name: '优秀起诉书范本（盗窃）.docx', url: '/files/excellent-indictment-theft.docx', size: '320KB', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
      { id: 'att-011', name: '优秀起诉书范本（诈骗）.docx', url: '/files/excellent-indictment-fraud.docx', size: '345KB', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
      { id: 'att-012', name: '优秀起诉书范本（危险驾驶）.docx', url: '/files/excellent-indictment-dUI.docx', size: '290KB', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
    ],
  },
  {
    id: 'rs-003', title: '共享：检察业务PPT模板合集',
    summary: '收集整理了一套适用于检察业务汇报的PPT模板。',
    content: '<p>为方便各部门制作工作汇报PPT，我收集整理了一套适用于检察业务场景的PPT模板，包含12种不同风格。</p>',
    category: 'resource-share', author: '办公室', publishDate: '2026-04-19T09:00:00Z', viewCount: 198, isTop: false, status: 'published',
    attachments: [
      { id: 'att-013', name: '检察业务PPT模板合集.pptx', url: '/files/ppt-templates.zip', size: '25.6MB', type: 'application/zip' },
    ],
  },
  {
    id: 'rs-004', title: '共享：公益诉讼办案指引手册',
    summary: '汇总公益诉讼检察办案流程和注意事项。',
    content: '<p>为方便公益诉讼检察部门办案，我整理了一份公益诉讼办案指引手册，涵盖线索发现、立案审查、调查取证、诉前程序、提起诉讼等全流程。</p>',
    category: 'resource-share', author: '公益诉讼检察部', publishDate: '2026-04-02T10:00:00Z', viewCount: 143, isTop: false, status: 'published',
    attachments: [
      { id: 'att-014', name: '公益诉讼办案指引手册.pdf', url: '/files/public-interest-guide.pdf', size: '3.2MB', type: 'application/pdf' },
    ],
  },
  {
    id: 'rs-005', title: '共享：常用法律法规速查表',
    summary: '制作了一份常用法律法规速查表，方便日常办案查阅。',
    content: '<p>为提高办案效率，我制作了一份常用法律法规速查表，涵盖刑法、刑事诉讼法、民法典等常用法律的核心条款。</p>',
    category: 'resource-share', author: '法律政策研究室', publishDate: '2026-03-18T09:00:00Z', viewCount: 212, isTop: false, status: 'published',
    attachments: [
      { id: 'att-015', name: '常用法律法规速查表.xlsx', url: '/files/law-reference.xlsx', size: '680KB', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    ],
  },
]

export const seedCategories: Category[] = [
  { code: 'leader-speech', name: '领导讲话', icon: 'User', order: 1, visible: true, routePath: '/modules/leader-speech' },
  { code: 'dept-dynamic', name: '部门动态', icon: 'OfficeBuilding', order: 2, visible: true, routePath: '/modules/dept-dynamic' },
  { code: 'training', name: '学习培训', icon: 'School', order: 3, visible: true, routePath: '/modules/training' },
  { code: 'file-download', name: '文件下载', icon: 'Download', order: 4, visible: true, routePath: '/modules/file-download' },
  { code: 'regulation', name: '规章制度', icon: 'Tickets', order: 5, visible: true, routePath: '/modules/regulation' },
  { code: 'party-building', name: '党建工作', icon: 'Flag', order: 6, visible: true, routePath: '/modules/party-building' },
  { code: 'study-garden', name: '学习园地', icon: 'Reading', order: 7, visible: true, routePath: '/modules/study-garden' },
  { code: 'resource-share', name: '资料共享', icon: 'Share', order: 8, visible: true, routePath: '/modules/resource-share' },
]
