const { useState } = React;

const papers = {
  p01: {
    title: "Emotion Markup Language",
    year: "2007",
    tag: "schema",
    summary: "A general framework for representing emotion categories, dimensions, appraisals, intensity and metadata.",
    richness: "Representational capacity for complex affective states.",
    use: "Useful as a conceptual foundation for what rich affective representation should be able to encode.",
    caution: "It is a representational proposal, not a validated multimodal annotation dataset."
  },
  p02: {
    title: "Comprehensive Guidelines for Emotion Annotation",
    year: "2022",
    tag: "guideline",
    summary: "Provides systematic guidance for annotating emotion categories, causes, speaker perspective and degree of emotion.",
    richness: "Annotation procedure and judgement criteria.",
    use: "Supports the generation and validation side of rich ground truth.",
    caution: "Guidelines improve consistency, but do not automatically produce descriptive rationales."
  },
  p03: {
    title: "Chatbot-supported Self-report for Pain Recognition",
    year: "2024",
    tag: "self-report",
    summary: "Uses chatbot-supported self-report to increase the reliability and richness of pain ground truth.",
    richness: "Participant qualification around scalar pain ratings.",
    use: "Strong example of moving from rating-only ground truth to contextualised self-report.",
    caution: "Domain-specific to pain and not directly a general emotion benchmark."
  },
  p04: {
    title: "RAF-AU Database",
    year: "2021",
    tag: "face + AU",
    summary: "Combines subjective facial-expression judgement with objective action unit annotations in the wild.",
    richness: "Emotion labels are supported by facial action evidence.",
    use: "Shows how subjective affect labels can be paired with behavioural evidence.",
    caution: "The evidence remains facial-action based rather than descriptive rationale."
  },
  p05: {
    title: "Multi-Rater Consensus Learning",
    year: "2024",
    tag: "multi-rater",
    summary: "Models multiple sparse ratings of affective behaviour instead of collapsing judgement into one label too early.",
    richness: "Annotator disagreement and plural affective judgement.",
    use: "Important for discussing uncertainty and reliability in affective ground truth.",
    caution: "Disagreement is modelled, but reasons for disagreement may remain implicit."
  },
  p06: {
    title: "Contextual Emotion Estimation from Image Captions",
    year: "2023",
    tag: "caption",
    summary: "Uses image captions to provide contextual information for emotion estimation.",
    richness: "Generated or extracted textual context around visual affect.",
    use: "Useful for showing how language can mediate visual affect interpretation.",
    caution: "The caption is auxiliary context, not necessarily human-validated rationale."
  },
  p07: {
    title: "Emotional Theory of Mind",
    year: "2024",
    tag: "reasoning",
    summary: "Connects fast visual processing with slower linguistic reasoning for contextual emotion understanding.",
    richness: "Narrative and reasoning scaffold around visual emotion inference.",
    use: "Relevant to affective reasoning beyond direct visual classification.",
    caution: "Reasoning traces need to be separated from annotated ground truth."
  },
  p08: {
    title: "Empower Typed Descriptions for SER",
    year: "2024",
    tag: "typed text",
    summary: "Uses typed descriptions, empowered by LLMs, to support speech emotion recognition.",
    richness: "Textual descriptions attached to acoustic affect cues.",
    use: "Highly relevant to descriptive rationale for emotion ratings.",
    caution: "Need to distinguish human typed descriptions from LLM-expanded descriptions."
  },
  p09: {
    title: "Emotion Flip Reasoning",
    year: "2024",
    tag: "emotion change",
    summary: "Studies emotional change in multiparty conversations by identifying flips and their triggers.",
    richness: "Temporal change, instigator and trigger evidence.",
    use: "Shows how affective ground truth can encode why an emotion changes.",
    caution: "Still mainly structured extraction rather than free-text rationale."
  },
  p10: {
    title: "Multimodal Emotion-Cause Pair Extraction",
    year: "2024",
    tag: "cause pair",
    summary: "Links emotions with their causes in multimodal conversational data.",
    richness: "Emotion-cause pairs across modalities.",
    use: "Central example of evidence-linked affective labels.",
    caution: "Cause pairing locates evidence but may not fully explain the judgement."
  },
  p11: {
    title: "LLMs as Perceivers of Dynamic Full-Body Expressions",
    year: "2024",
    tag: "body emotion",
    summary: "Examines how LLMs perceive dynamic full-body expressions of emotion.",
    richness: "Distributional or nuanced full-body emotion perception.",
    use: "Extends affect labels beyond face-only recognition.",
    caution: "More relevant to perception and benchmarking than rationale annotation."
  },
  p12: {
    title: "MAFW",
    year: "2022",
    tag: "compound emotion",
    summary: "A large-scale multimodal dataset for compound affective states in dynamic facial expressions.",
    richness: "Compound affect categories and dynamic multimodal clips.",
    use: "Useful for arguing against single basic-emotion labels.",
    caution: "Compound labels are richer representationally, but not explanatory."
  },
  p13: {
    title: "Emotion-LLaMA",
    year: "2024",
    tag: "MLLM",
    summary: "Uses multimodal instruction tuning for emotion recognition and reasoning.",
    richness: "Model-mediated reasoning around multimodal affect.",
    use: "Useful for discussing generated reasoning and scalable affect explanation.",
    caution: "Generated reasoning should not be equated with validated ground truth."
  },
  p14: {
    title: "MTP",
    year: "2024",
    tag: "turning point",
    summary: "A dataset for multimodal turning points in casual conversations.",
    richness: "Temporal turning points and affective change.",
    use: "Shows affect as dynamic and event-linked rather than static.",
    caution: "Turning-point labels are structured evidence, not full rationales."
  },
  p15: {
    title: "SemEval-2024 Task 3",
    year: "2024",
    tag: "MECAC",
    summary: "Shared task on multimodal emotion cause analysis in conversations.",
    richness: "Emotion labels linked with multimodal causes.",
    use: "Important benchmark for cause-grounded affective supervision.",
    caution: "Benchmark evaluation focuses on extraction performance."
  },
  p16: {
    title: "Emosical",
    year: "2023",
    tag: "musical theatre",
    summary: "An emotion-annotated musical theatre dataset.",
    richness: "Affective labels in a narrative and musical performance context.",
    use: "Useful as a domain case where affect is multimodal and contextual.",
    caution: "Richness mainly comes from context and domain, not necessarily rationale labels."
  },
  p17: {
    title: "EEVR",
    year: "2024",
    tag: "physiology + text",
    summary: "Pairs physiological signals with textual descriptions for joint emotion representation learning.",
    richness: "Physiological data linked with descriptive text.",
    use: "Strong bridge between bodily signal and verbal affect description.",
    caution: "Need to clarify whether descriptions are self-report, annotation, or paired metadata."
  },
  p18: {
    title: "PEACE-Reviews",
    year: "2023",
    tag: "appraisal",
    summary: "Models cognitive appraisals in emotion text analysis.",
    richness: "Appraisal dimensions explain why an emotion arises.",
    use: "Relevant because appraisal is closer to explanation than emotion category alone.",
    caution: "It is text-focused and construct-specific."
  },
  p19: {
    title: "Beyond Classification",
    year: "2025",
    tag: "reasoning",
    summary: "Moves speech emotion recognition toward emotion reasoning with multitask AudioLLMs.",
    richness: "Reasoning-oriented supervision and descriptive explanation around speech emotion.",
    use: "Highly relevant to rationale-linked affect recognition.",
    caution: "Need to separate annotated reasoning from generated model reasoning."
  },
  p20: {
    title: "MPEG",
    year: "2024",
    tag: "causal entailment",
    summary: "Uses graph attention for causal emotion entailment in conversations.",
    richness: "Target emotion linked to causal utterance evidence.",
    use: "Good example of structured causal rationale.",
    caution: "The explanation is an entailment relation, not natural-language rationale."
  },
  p21: {
    title: "ECDaily",
    year: "2025",
    tag: "daily causes",
    summary: "Large-scale benchmark for emotion cause extraction in conversations.",
    richness: "Individual and aggregated causes across conversational context.",
    use: "Important for distributed causes rather than single trigger assumptions.",
    caution: "Cause annotation remains extractive and task-specific."
  },
  p22: {
    title: "VLLMs Provide Better Context",
    year: "2024",
    tag: "VLLM context",
    summary: "Uses VLLMs to generate better contextual descriptions for emotion understanding.",
    richness: "Generated subject-specific context descriptions.",
    use: "Strong example of scalable pseudo-rationale generation.",
    caution: "Descriptions require validation before being treated as ground truth."
  },
  p23: {
    title: "M3HG",
    year: "2025",
    tag: "triplet",
    summary: "Models multimodal, multi-scale and multi-type heterogeneous graphs for emotion-cause triplet extraction.",
    richness: "Utterance-cause-emotion triplets with cause type and modality cues.",
    use: "Very relevant to structured rich affective ground truth.",
    caution: "Triplets are informative but still not full natural-language rationales."
  },
  p24: {
    title: "Synergy of Sight and Semantics",
    year: "2024",
    tag: "label semantics",
    summary: "Uses visual intention understanding with CLIP and semantic label structure.",
    richness: "Class-level semantic enrichment.",
    use: "Useful boundary case for derived label semantics.",
    caution: "Richness is mostly label-representation side, not sample-level rationale."
  },
  p25: {
    title: "Socially Competent Task-Oriented Agent",
    year: "2023",
    tag: "dialogue action",
    summary: "Studies generation for socially competent task-oriented agents using emotion and strategy labels.",
    richness: "Socio-emotional labels for response planning.",
    use: "Shows affect labels as interactional resources, not just recognition targets.",
    caution: "More related to dialogue generation than ground-truth rationale validation."
  },
  p26: {
    title: "MER-MPCK",
    year: "2024",
    tag: "commonsense",
    summary: "Integrates multi-perspective commonsense knowledge for multi-label emotion recognition.",
    richness: "Commonsense perspectives as auxiliary reasoning features.",
    use: "Relevant to external knowledge enrichment.",
    caution: "Commonsense knowledge is model-side support, not annotated ground truth."
  },
  p27: {
    title: "Scene Graphs",
    year: "2024",
    tag: "scene graph",
    summary: "Uses scene graphs for hierarchical context-based emotion recognition.",
    richness: "Objects and relations make visual context explicit.",
    use: "Shows how multimodal evidence can be structured.",
    caution: "Scene graph is evidence representation, not necessarily a label rationale."
  },
  p28: {
    title: "VAD",
    year: "2024",
    tag: "video + danmu",
    summary: "A video affective dataset with valence, arousal, primary emotion, comparison labels and danmu.",
    richness: "Multiple affect dimensions plus viewer textual reactions.",
    use: "Strong example of representationally rich video affect labels.",
    caution: "Danmu adds context but does not automatically explain each label."
  },
  p29: {
    title: "MEmoR",
    year: "2024",
    tag: "emotion reasoning",
    summary: "Dataset for multimodal emotion reasoning in videos, including speakers and non-speakers.",
    richness: "Emotion labels supported by context, external knowledge and reasoning cues.",
    use: "Relevant to emotion reasoning beyond visible expression.",
    caution: "Need to distinguish annotated context from model-inferred reasoning."
  },
  p30: {
    title: "Pose-based Body Language Recognition",
    year: "2024",
    tag: "body language",
    summary: "Uses pose-based body-language recognition for emotion and psychiatric symptom interpretation.",
    richness: "Behavioural and bodily cue layer.",
    use: "Adds interpretable body-language evidence to affect interpretation.",
    caution: "Body-language cues are evidence features, not full rationales."
  },
  p31: {
    title: "Personality-Aware Engagement Prediction",
    year: "2025",
    tag: "engagement",
    summary: "Predicts engagement in online learning with personality-aware context.",
    richness: "Engagement labels linked with personality context.",
    use: "Useful for situated and person-aware affective states.",
    caution: "Engagement/personality complexity is not automatically rich label richness."
  },
  p32: {
    title: "ReDSM5",
    year: "2024",
    tag: "clinical rationale",
    summary: "Reddit depression dataset with sentence-level DSM-5 labels and expert clinical rationales.",
    richness: "Expert-written rationales linked to diagnostic symptom labels.",
    use: "One of the clearest rationale-ground-truth examples.",
    caution: "Mental-health text domain differs from multimodal affect recognition."
  },
  p33: {
    title: "EmoPillars",
    year: "2025",
    tag: "synthetic labels",
    summary: "Uses knowledge distillation and synthetic context-aware/context-less data for fine-grained emotion classification.",
    richness: "Synthetic soft-label and contextual supervision.",
    use: "Useful for scalable enrichment strategies.",
    caution: "Synthetic labels require careful separation from human ground truth."
  },
  p34: {
    title: "COPING",
    year: "2024",
    tag: "coping",
    summary: "Emotion and coping strategy corpus based on role playing.",
    richness: "Emotion labels linked to coping strategies and behavioural functions.",
    use: "Shows affect in relation to action tendency and social response.",
    caution: "Role-playing affects ecological validity."
  },
  p35: {
    title: "The Homework Wars",
    year: "2025",
    tag: "family interaction",
    summary: "Studies emotions, behaviours and conflicts in parent-child homework interactions.",
    richness: "Emotion shifts, parental behaviours and conflict types in real interaction.",
    use: "Strong example of interactional affective ground truth.",
    caution: "Domain-specific and partly dependent on LLM-supported coding."
  },
  p36: {
    title: "Error-correcting Output Codes",
    year: "2016",
    tag: "codeword",
    summary: "Uses error-correcting output codes for multi-label emotion classification.",
    richness: "Redundant mathematical label encoding.",
    use: "Boundary case of structural label enrichment for reliability.",
    caution: "Not interpretable as a descriptive rationale."
  },
  p37: {
    title: "UniVA",
    year: "2024",
    tag: "VA prior",
    summary: "Uses valence-arousal driven contrastive learning for multimodal multi-label emotion recognition.",
    richness: "VA priors encode relations among emotion labels and modalities.",
    use: "Useful for representational enrichment through affect dimensions.",
    caution: "VA relations are not per-sample human explanations."
  },
  p38: {
    title: "Affect-GCN",
    year: "2023",
    tag: "multi-task labels",
    summary: "Multimodal graph convolutional approach using emotion, intensity and sentiment supervision.",
    richness: "Multi-emotion, intensity and sentiment label bundle.",
    use: "Good example of multicomponent affect labels.",
    caution: "No descriptive rationale is attached to the rating."
  },
  p39: {
    title: "EPO-ECPE",
    year: "2023",
    tag: "ECPE",
    summary: "Emotion prediction oriented method with multiple supervisions for emotion-cause pair extraction.",
    richness: "Emotion clauses and cause clauses linked as structured targets.",
    use: "Useful for cause/evidence branch of rich labels.",
    caution: "Text-only and clause-level; not free-form rationale."
  },
  p40: {
    title: "Contextual Emotion Recognition with LVLMs",
    year: "2024",
    tag: "LVLM",
    summary: "Uses large vision-language models and generated descriptions for contextual apparent emotion recognition.",
    richness: "Generated narrative descriptions around who, what, where and how.",
    use: "Highly relevant to descriptive scaffolding for emotion interpretation.",
    caution: "Descriptions should be treated as pseudo-rationales unless validated."
  },
  p41: {
    title: "Knowledge-Guided Sentiment Analysis",
    year: "2021",
    tag: "weak labels",
    summary: "Parses natural-language explanations into labelling functions for weakly supervised sentiment analysis.",
    richness: "Explanations operationalised as weak supervision.",
    use: "Methodological precedent for using explanations to generate supervision.",
    caution: "Generated labels are noisy supervision rather than direct ground truth."
  },
  p42: {
    title: "A New Task for Emotions and Dialogue Strategies",
    year: "2023",
    tag: "next-turn labels",
    summary: "Predicts emotion and dialogue-strategy labels for the next speaker turn in task-oriented dialogue.",
    richness: "Ordered socio-emotional label sequences.",
    use: "Useful for dynamic and interactional affective ground truth.",
    caution: "Richness is in planning labels, not explanatory rationale."
  },
  p43: {
    title: "WASSA 2023 Shared Task",
    year: "2023",
    tag: "benchmark",
    summary: "Benchmark for empathy, emotion and personality detection in conversations and news reactions.",
    richness: "Self-report and third-party annotations across empathy, distress, emotion and personality.",
    use: "Useful for multi-level subjective affect annotation.",
    caution: "Complex constructs are not automatically rich unless linked to evidence or validation."
  },
  p44: {
    title: "Triple-View FEC",
    year: "2025",
    tag: "label description",
    summary: "Uses emotion label descriptions and clustering-guided contrastive learning for fine-grained emotion classification.",
    richness: "Label descriptions and label-label relationships.",
    use: "Good example of derived label semantics.",
    caution: "Enriches label representation more than ground truth itself."
  }
};

const paperBibliography = {
  p01: {
    citationTitle: "What Should a Generic Emotion Markup Language Be Able to Represent?",
    authors: "Marc Schroder, Laurence Devillers, Kostas Karpouzis, Jean-Claude Martin, Catherine Pelachaud, Christian Peter, Hannes Pirker, Bjorn Schuller, Jianhua Tao, Ian Wilson",
    doi: "10.1007/978-3-540-74889-2_39",
    venue: "Affective Computing and Intelligent Interaction",
    bibtexKey: "schroderWhatShouldGeneric2007a"
  },
  p02: {
    citationTitle: "Comprehensive Guidelines for Emotion Annotation",
    authors: "Md. Adnanul Islam, Md. Saddam Hossain Mukta, Patrick Olivier, Md. Mahbubur Rahman",
    doi: "10.1145/3514197.3549640",
    venue: "Proceedings of the 22nd ACM International Conference on Intelligent Virtual Agents",
    bibtexKey: "islamComprehensiveGuidelinesEmotion2022"
  },
  p03: {
    citationTitle: "Towards Chatbot-Supported Self-Reporting for Increased Reliability and Richness of Ground Truth for Automatic Pain Recognition: Reflections on Long-Distance Runners and People with Chronic Pain",
    authors: "Tao Bi, Raffaele Andrea Buono, Temitayo Olugbade, Aneesha Singh, Catherine Holloway, Enrico Costanza, Amanda C de C Williams, Nicolas E. Gold, Nadia Berthouze",
    doi: "10.1145/3461615.3485670",
    venue: "Companion Publication of the 2021 International Conference on Multimodal Interaction",
    bibtexKey: "biChatbotSupportedSelfReportingIncreased2021b"
  },
  p04: {
    citationTitle: "RAF-AU Database: In-the-Wild Facial Expressions with Subjective Emotion Judgement and Objective AU Annotations",
    authors: "Wen-Jing Yan, Shan Li, Chengtao Que, Jiquan Pei, Weihong Deng",
    doi: "10.1007/978-3-030-69544-6_5",
    venue: "Computer Vision -- ACCV 2020",
    bibtexKey: "yanRAFAUDatabaseIntheWild2021"
  },
  p05: {
    citationTitle: "Multi-Rater Consensus Learning for Modeling Multiple Sparse Ratings of Affective Behaviour",
    authors: "Luca Romeo, Temitayo Olugbade, Massimiliano Pontil, Nadia Bianchi-Berthouze",
    doi: "10.1109/TAFFC.2023.3297270",
    venue: "IEEE Transactions on Affective Computing",
    bibtexKey: "romeoMultiRaterConsensusLearning2024a"
  },
  p06: {
    citationTitle: "Contextual Emotion Estimation from Image Captions",
    authors: "Vera Yang, Archita Srivastava, Yasaman Etesam, Chuxuan Zhang, Angelica Lim",
    doi: "10.1109/ACII59096.2023.10388198",
    venue: "2023 11th International Conference on Affective Computing and Intelligent Interaction (ACII)",
    bibtexKey: "yangContextualEmotionEstimation2023"
  },
  p07: {
    citationTitle: "Emotional Theory of Mind: Bridging Fast Visual Processing with Slow Linguistic Reasoning",
    authors: "Yasaman Etesam, Ozge Nilay Yalcin, Chuxuan Zhang, Angelica Lim",
    doi: "10.1109/ACII63134.2024.00006",
    venue: "2024 12th International Conference on Affective Computing and Intelligent Interaction (ACII)",
    bibtexKey: "etesamEmotionalTheoryMind2024"
  },
  p08: {
    citationTitle: "Empower Typed Descriptions by Large Language Models for Speech Emotion Recognition",
    authors: "Haibin Wu, Huang-Cheng Chou, Kai-Wei Chang, Lucas Goncalves, Jiawei Du, Jyh-Shing Roger Jang, Chi-Chun Lee, Hung-Yi Lee",
    doi: "10.1109/APSIPAASC63619.2025.10848758",
    venue: "2024 Asia Pacific Signal and Information Processing Association Annual Summit and Conference (APSIPA ASC)",
    bibtexKey: "wuEmpowerTypedDescriptions2024"
  },
  p09: {
    citationTitle: "Emotion Flip Reasoning in Multiparty Conversations",
    authors: "Shivani Kumar, Shubham Dudeja, Md Shad Akhtar, Tanmoy Chakraborty",
    doi: "10.1109/TAI.2023.3289937",
    venue: "IEEE Transactions on Artificial Intelligence",
    bibtexKey: "kumarEmotionFlipReasoning2024"
  },
  p10: {
    citationTitle: "Multimodal Emotion-Cause Pair Extraction in Conversations",
    authors: "Fanfan Wang, Zixiang Ding, Rui Xia, Zhaoyu Li, Jianfei Yu",
    doi: "10.1109/TAFFC.2022.3226559",
    venue: "IEEE Transactions on Affective Computing",
    bibtexKey: "wangMultimodalEmotionCausePair2023"
  },
  p11: {
    citationTitle: "Large Language Models as Perceivers of Dynamic Full-Body Expressions of Emotion",
    authors: "Huakun Liu, Miao Cheng, Xin Wei, Felix Dollack, Victor Schneider, Hideaki Uchiyama, Yoshifumi Kitamura, Kiyoshi Kiyokawa, Monica Perusquia-Hernandez",
    doi: "10.1145/3747327.3763032",
    venue: "Companion Proceedings of the 27th International Conference on Multimodal Interaction",
    bibtexKey: "liuLargeLanguageModels2025"
  },
  p12: {
    citationTitle: "MAFW: A Large-scale, Multi-modal, Compound Affective Database for Dynamic Facial Expression Recognition in the Wild",
    authors: "Yuanyuan Liu, Wei Dai, Chuanxu Feng, Wenbin Wang, Guanghao Yin, Jiabei Zeng, Shiguang Shan",
    doi: "10.1145/3503161.3548190",
    venue: "Proceedings of the 30th ACM International Conference on Multimedia",
    bibtexKey: "liuMAFWLargescaleMultimodal2022"
  },
  p13: {
    citationTitle: "Emotion-LLaMA: Multimodal Emotion Recognition and Reasoning with Instruction Tuning",
    authors: "Zebang Cheng, Zhi-Qi Cheng, Jun-Yan He, Jingdong Sun, Kai Wang, Yuxiang Lin, Zheng Lian, Xiaojiang Peng, Alexander Hauptmann",
    doi: "10.48550/arXiv.2406.11161",
    venue: "arXiv",
    bibtexKey: "chengEmotionLLaMAMultimodalEmotion2024e"
  },
  p14: {
    citationTitle: "MTP: A Dataset for Multi-Modal Turning Points in Casual Conversations",
    authors: "Gia-Bao Ho, Chang Tan, Zahra Darban, Mahsa Salehi, Reza Haf, Wray Buntine",
    doi: "10.18653/v1/2024.acl-short.30",
    venue: "Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (Volume 2: Short Papers)",
    bibtexKey: "hoMTPDatasetMultiModal2024"
  },
  p15: {
    citationTitle: "SemEval-2024 Task 3: Multimodal Emotion Cause Analysis in Conversations",
    authors: "Fanfan Wang, Heqing Ma, Rui Xia, Jianfei Yu, Erik Cambria",
    doi: "10.18653/v1/2024.semeval-1.277",
    venue: "Proceedings of the 18th International Workshop on Semantic Evaluation (SemEval-2024)",
    bibtexKey: "wangSemEval2024Task32024"
  },
  p16: {
    citationTitle: "Emosical: An Emotion-Annotated Musical Theatre Dataset",
    authors: "Hayoon Kim, Ahyeon Choi, Sungho Lee, Hyun Jin Jung, Kyogu Lee",
    doi: "10.18653/v1/2024.findings-emnlp.241",
    venue: "Findings of the Association for Computational Linguistics: EMNLP 2024",
    bibtexKey: "kimEmosicalEmotionAnnotatedMusical2024c"
  },
  p17: {
    citationTitle: "EEVR: A Dataset of Paired Physiological Signals and Textual Descriptions for Joint Emotion Representation Learning",
    authors: "Pragya Singh, Ritvik Budhiraja, Ankush Gupta, Anshul Goswami, Mohan Kumar, Pushpendra Singh",
    doi: "",
    venue: "",
    bibtexKey: "singhEEVRDatasetPairedb"
  },
  p18: {
    citationTitle: "The PEACE-Reviews Dataset: Modeling Cognitive Appraisals in Emotion Text Analysis",
    authors: "Gerard Yeo, Kokil Jaidka",
    doi: "10.18653/v1/2023.findings-emnlp.186",
    venue: "Findings of the Association for Computational Linguistics: EMNLP 2023",
    bibtexKey: "yeoPEACEReviewsDatasetModeling2023a"
  },
  p19: {
    citationTitle: "Beyond Classification: Towards Speech Emotion Reasoning with Multitask AudioLLMs",
    authors: "Wenyu Zhang, Yingxu He, Geyu Lin, Zhuohan Liu, Shuo Sun, Bin Wang, Xunlong Zou, Jeremy H. M. Wong, Qiongqiong Wang, Hardik Bhupendra Sailor, Nancy F. Chen, AiTi Aw",
    doi: "10.18653/v1/2025.ijcnlp-long.62",
    venue: "Proceedings of the 14th International Joint Conference on Natural Language Processing and the 4th Conference of the Asia-Pacific Chapter of the Association for Computational Linguistics",
    bibtexKey: "zhangClassificationSpeechEmotion2025a"
  },
  p20: {
    citationTitle: "MPEG: A Multi-Perspective Enhanced Graph Attention Network for Causal Emotion Entailment in Conversations",
    authors: "Tiantian Chen, Ying Shen, Xuri Chen, Lin Zhang, Shengjie Zhao",
    doi: "10.1109/TAFFC.2023.3315752",
    venue: "IEEE Transactions on Affective Computing",
    bibtexKey: "chenMPEGMultiPerspectiveEnhanced2024"
  },
  p21: {
    citationTitle: "ECDaily: A Large-scale Benchmark for Emotion Cause Extraction in Conversations",
    authors: "Xiangqing Shen, Ke Li, Jiaming An, Zixiang Ding, Rui Xia",
    doi: "10.1109/TAFFC.2024.3524124",
    venue: "IEEE Transactions on Affective Computing",
    bibtexKey: "shenECDailyLargescaleBenchmark2025"
  },
  p22: {
    citationTitle: "VLLMs Provide Better Context for Emotion Understanding Through Common Sense Reasoning",
    authors: "Alexandros Xenos, Niki M. Foteinopoulou, Ioanna Ntinou, Ioannis Patras, Georgios Tzimiropoulos",
    doi: "10.1109/IJCNN64981.2025.11227260",
    venue: "2025 International Joint Conference on Neural Networks (IJCNN)",
    bibtexKey: "xenosVLLMsProvideBetter2025"
  },
  p23: {
    citationTitle: "M3HG: Multimodal, Multi-scale, and Multi-type Node Heterogeneous Graph for Emotion Cause Triplet Extraction in Conversations",
    authors: "Qiao Liang, Ying Shen, Tiantian Chen, Lin Zhang",
    doi: "10.18653/v1/2025.findings-acl.596",
    venue: "Findings of the Association for Computational Linguistics: ACL 2025",
    bibtexKey: "liangM3HGMultimodalMultiscale2025"
  },
  p24: {
    citationTitle: "Synergy of Sight and Semantics: Visual Intention Understanding with CLIP",
    authors: "Qu Yang, Mang Ye, Dacheng Tao",
    doi: "10.1007/978-3-031-73247-8_9",
    venue: "Computer Vision -- ECCV 2024",
    bibtexKey: "yangSynergySightSemantics2025"
  },
  p25: {
    citationTitle: "Natural Language Generation for Socially Competent Task-Oriented Agent",
    authors: "Lorraine Vanel",
    doi: "10.1109/ACIIW59127.2023.10388129",
    venue: "2023 11th International Conference on Affective Computing and Intelligent Interaction Workshops and Demos (ACIIW)",
    bibtexKey: "vanelNaturalLanguageGeneration2023"
  },
  p26: {
    citationTitle: "Multi-Label Emotion Recognition Model Integrating Multi-Perspective Common Sense Knowledge",
    authors: "Qiyun Peng, Yongan Wan, Xueqiang Zeng",
    doi: "10.1109/ICNLP65360.2025.11108467",
    venue: "2025 7th International Conference on Natural Language Processing (ICNLP)",
    bibtexKey: "pengMultiLabelEmotionRecognition2025"
  },
  p27: {
    citationTitle: "Hierarchical Context-Based Emotion Recognition With Scene Graphs",
    authors: "Shichao Wu, Lei Zhou, Zhengxi Hu, Jingtai Liu",
    doi: "10.1109/TNNLS.2022.3196831",
    venue: "IEEE Transactions on Neural Networks and Learning Systems",
    bibtexKey: "wuHierarchicalContextBasedEmotion2024"
  },
  p28: {
    citationTitle: "VAD: A Video Affective Dataset With Danmu",
    authors: "Shangfei Wang, Xin Li, Feiyi Zheng, Jicai Pan, Xuewei Li, Yanan Chang, Zhou'an Zhu, Qiong Li, Jiahe Wang, Yufei Xiao",
    doi: "10.1109/TAFFC.2024.3382503",
    venue: "IEEE Transactions on Affective Computing",
    bibtexKey: "wangVADVideoAffective2024"
  },
  p29: {
    citationTitle: "MEmoR: A Dataset for Multimodal Emotion Reasoning in Videos",
    authors: "Guangyao Shen, Xin Wang, Xuguang Duan, Hongzhi Li, Wenwu Zhu",
    doi: "10.1145/3394171.3413909",
    venue: "Proceedings of the 28th ACM International Conference on Multimedia",
    bibtexKey: "shenMEmoRDatasetMultimodal2020"
  },
  p30: {
    citationTitle: "Pose-Based Body Language Recognition for Emotion and Psychiatric Symptom Interpretation",
    authors: "Zhengyuan Yang, Amanda Kay, Yuncheng Li, Wendi Cross, Jiebo Luo",
    doi: "10.1109/ICPR48806.2021.9412591",
    venue: "2020 25th International Conference on Pattern Recognition (ICPR)",
    bibtexKey: "yangPosebasedBodyLanguage2021"
  },
  p31: {
    citationTitle: "Personality-Aware Engagement Prediction in Online Learning",
    authors: "Jialin Li, Gulshan Sharma, Hanan Salam",
    doi: "10.1145/3746270.3760234",
    venue: "Proceedings of the 3rd International Workshop on Multimodal and Responsible Affective Computing",
    bibtexKey: "liPersonalityAwareEngagementPrediction2025a"
  },
  p32: {
    citationTitle: "ReDSM5: A Reddit Dataset for DSM-5 Depression Detection",
    authors: "Eliseo Bao, Anxo Perez, Javier Parapar",
    doi: "10.1145/3746252.3761610",
    venue: "Proceedings of the 34th ACM International Conference on Information and Knowledge Management",
    bibtexKey: "baoReDSM5RedditDataset2025"
  },
  p33: {
    citationTitle: "Emo Pillars: Knowledge Distillation to Support Fine-Grained Context-Aware and Context-Less Emotion Classification",
    authors: "Alexander Shvets",
    doi: "10.18653/v1/2025.findings-acl.10",
    venue: "Findings of the Association for Computational Linguistics: ACL 2025",
    bibtexKey: "shvetsEmoPillarsKnowledge2025"
  },
  p34: {
    citationTitle: "Dealing with Controversy: An Emotion and Coping Strategy Corpus Based on Role Playing",
    authors: "Enrica Troiano, Sofie Labat, Marco Antonio Stranisci, Rossana Damiano, Viviana Patti, Roman Klinger",
    doi: "10.18653/v1/2024.findings-emnlp.89",
    venue: "Findings of the Association for Computational Linguistics: EMNLP 2024",
    bibtexKey: "troianoDealingControversyEmotion2024"
  },
  p35: {
    citationTitle: "The Homework Wars: Exploring Emotions, Behaviours, and Conflicts in Parent-Child Homework Interactions",
    authors: "Nan Gao, Yibin Liu, Xin Tang, Yanyan Liu, Chun Yu, Yun Huang, Yuntao Wang, Flora D. Salim, Xuhai Xu, Jun Wei, Yuanchun Shi",
    doi: "10.1145/3749517",
    venue: "Proc. ACM Interact. Mob. Wearable Ubiquitous Technol.",
    bibtexKey: "gaoHomeworkWarsExploring2025a"
  },
  p36: {
    citationTitle: "Error-Correcting Output Codes for Multi-Label Emotion Classification",
    authors: "Chao Li, Zhiyong Feng, Chao Xu",
    doi: "10.1007/s11042-016-3608-7",
    venue: "Multimedia Tools and Applications",
    bibtexKey: "liErrorcorrectingOutputCodes2016"
  },
  p37: {
    citationTitle: "A Unimodal Valence-Arousal Driven Contrastive Learning Framework for Multimodal Multi-Label Emotion Recognition",
    authors: "Wenjie Zheng, Jianfei Yu, Rui Xia",
    doi: "10.1145/3664647.3681638",
    venue: "Proceedings of the 32nd ACM International Conference on Multimedia",
    bibtexKey: "zhengUnimodalValenceArousalDriven2024"
  },
  p38: {
    citationTitle: "Affect-GCN: A Multimodal Graph Convolutional Network for Multi-Emotion with Intensity Recognition and Sentiment Analysis in Dialogues",
    authors: "Mauajama Firdaus, Gopendra Vikram Singh, Asif Ekbal, Pushpak Bhattacharyya",
    doi: "10.1007/s11042-023-14885-1",
    venue: "Multimedia Tools and Applications",
    bibtexKey: "firdausAffectGCNMultimodalGraph2023"
  },
  p39: {
    citationTitle: "Emotion Prediction Oriented Method With Multiple Supervisions for Emotion-Cause Pair Extraction",
    authors: "Guimin Hu, Yi Zhao, Guangming Lu",
    doi: "10.1109/TASLP.2023.3250833",
    venue: "IEEE/ACM Transactions on Audio, Speech, and Language Processing",
    bibtexKey: "huEmotionPredictionOriented2023"
  },
  p40: {
    citationTitle: "Contextual Emotion Recognition Using Large Vision Language Models",
    authors: "Yasaman Etesam, Ozge Nilay Yalcin, Chuxuan Zhang, Angelica Lim",
    doi: "10.1109/IROS58592.2024.10802538",
    venue: "2024 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)",
    bibtexKey: "etesamContextualEmotionRecognition2024"
  },
  p41: {
    citationTitle: "Knowledge-Guided Sentiment Analysis Via Learning From Natural Language Explanations",
    authors: "Zunwang Ke, Jiabao Sheng, Zhe Li, Wushour Silamu, Qinglang Guo",
    doi: "10.1109/ACCESS.2020.3048088",
    venue: "IEEE Access",
    bibtexKey: "keKnowledgeGuidedSentimentAnalysis2021"
  },
  p42: {
    citationTitle: "A New Task for Predicting Emotions and Dialogue Strategies in Task-Oriented Dialogue",
    authors: "Lorraine Vanel, Alya Yacoubi, Chloe Clavel",
    doi: "10.1109/ACII59096.2023.10388099",
    venue: "2023 11th International Conference on Affective Computing and Intelligent Interaction (ACII)",
    bibtexKey: "vanelNewTaskPredicting2023"
  },
  p43: {
    citationTitle: "Findings of WASSA 2023 Shared Task on Empathy, Emotion and Personality Detection in Conversation and Reactions to News Articles",
    authors: "Valentin Barriere, Joao Sedoc, Shabnam Tafreshi, Salvatore Giorgi",
    doi: "10.18653/v1/2023.wassa-1.44",
    venue: "Proceedings of the 13th Workshop on Computational Approaches to Subjectivity, Sentiment, & Social Media Analysis",
    bibtexKey: "barriereFindingsWASSA20232023"
  },
  p44: {
    citationTitle: "A Triple-View Framework for Fine-Grained Emotion Classification with Clustering-Guided Contrastive Learning",
    authors: "Junqing Gong, Binhan Yang, Wei Shen",
    doi: "10.18653/v1/2025.acl-long.247",
    venue: "Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)",
    bibtexKey: "gongTripleViewFrameworkFineGrained2025a"
  }
};

const taxonomyComponent = (id, label, keywords, paperIds = []) => ({ id, label, keywords, paperIds });

const level2Categories = [
  {
    id: "affective-state",
    title: "Affective-target Representation",
    shortTitle: "Affective state",
    mark: "G",
    accent: "amber",
    occurrenceCount: 64,
    summary: "Additional information incorporated into the core affective target, including intensity or dimensional information, co-occurring affective states, uncertainty or disagreement, and affective change over time.",
    anchors: "granularity; multiplicity; uncertainty; dynamics",
    bullets: [
      "discrete emotion, expression, empathy, pain, or clinical symptom labels",
      "valence, arousal, dominance, PAD, pain level, wellbeing, or other rating scales",
      "multi-label, blended, compound, or co-occurring affect",
      "intensity, degree, probability, soft labels, or distributional labels",
      "sentiment, polarity, emotion shift, turning point, or temporal affect change"
    ],
    components: [
      taxonomyComponent("domain-specific", "Domain-specific affective states", ["pain", "depression", "distress", "empathy", "worry", "well-being", "likeness", "symptom"]),
      taxonomyComponent("intensity", "Intensity", ["intensity"]),
      taxonomyComponent("multi-compound", "Multi-label / compound", ["multi-label", "compound"]),
      taxonomyComponent("soft-distributional", "Soft / probabilistic / distributional", ["soft", "distribution", "probability", "uncertainty", "disagreement"]),
      taxonomyComponent("temporal-transition", "Temporal / transition labels", ["emotion flip", "turning point", "pre-point", "post-point", "shift values", "temporal"], ["p35", "p14", "p09"]),
      taxonomyComponent("sentiment-polarity", "Sentiment / polarity", ["sentiment", "polarity"]),
      taxonomyComponent("natural-language-state", "Natural-language statement", ["natural-language", "natural language", "affective statement"])
    ],
    papers: ["p06","p17","p02","p03","p07","p08","p13","p19","p32","p41","p16","p22","p34","p35","p40","p14","p10","p15","p21","p23","p12","p33","p29","p09","p18","p26","p20","p11","p27","p01","p38","p43","p37"]
  },
  {
    id: "context-setting",
    title: "Context, Identity, Social Interaction, and Discourse Setting",
    shortTitle: "Context",
    mark: "C",
    accent: "sky",
    occurrenceCount: 50,
    summary: "Personal, situational, and conversational information surrounding an affective judgement, including scene or environment, identity, speaker role, dialogue content, social interaction, and temporal context.",
    anchors: "identity/demographic/role/speaker labels; context/scene/environment descriptors; dialogue/source content; generated narrative; social interaction; temporal/local context",
    bullets: [
      "person, speaker, role, demographic, or character identity",
      "scene, environment, situation, or world context",
      "dialogue, utterance, subtitle, essay, lyrics, or text source",
      "social interaction, relationship, conflict, or interpersonal setting",
      "generated scenario, plot, caption, or local temporal context"
    ],
    components: [
      taxonomyComponent("environment-scene", "Environment / scene / location", ["scene", "environment", "setting", "location", "image/background"]),
      taxonomyComponent("identity-role", "Identity / role / demographics", ["identity", "speaker", "role", "character", "demographic"]),
      taxonomyComponent("social-interaction", "Social / relationship / interaction", ["social", "relationship", "interaction", "conflict", "parent-child"]),
      taxonomyComponent("linguistic-dialogue", "Linguistic / dialogue context", ["dialogue", "sentence structure", "subtitle", "lyrics", "utterance"]),
      taxonomyComponent("temporal-context", "Temporal context", ["time", "timestamp", "emotion moment", "local temporal"]),
      taxonomyComponent("scenario-source", "Scenario / product / source context", ["product context", "scenario information", "source content", "essay", "video content"]),
      taxonomyComponent("generated-narrative", "Generated narrative / description", ["generated", "narrative", "description", "plot", "caption"]),
      taxonomyComponent("familiarity-authenticity", "Familiarity / authenticity", ["familiarity", "authenticity", "acting"])
    ],
    papers: ["p06","p17","p02","p07","p13","p32","p16","p22","p35","p40","p14","p15","p23","p12","p33","p29","p09","p18","p20","p11","p27","p01","p38","p43"]
  },
  {
    id: "reasoning-causal",
    title: "Explanation, Causal, and Appraisal Enrichment",
    shortTitle: "Explanation",
    mark: "E",
    accent: "emerald",
    occurrenceCount: 41,
    summary: "Components representing an explanation for an affective judgement, an event linked to that judgement, an appraisal of the situation, or a coping orientation adopted in response.",
    anchors: "emotion-cause and trigger annotations; affective explanation/rationale labels; appraisal/coping/regulation labels",
    bullets: [
      "emotion-cause pair, cause utterance, cause span, or trigger",
      "natural-language explanation, rationale, or reasoning trace",
      "evidence-grounded reasoning from text, audio, vision, or context",
      "clinical, expert, LLM-generated, or self-report rationale",
      "appraisal, coping, regulation, or antecedent assessment"
    ],
    components: [
      taxonomyComponent("rationale-explanation", "Rationale / explanation", ["rationale", "explanation", "reasoning trace", "annotation reason", "reason of rating", "free-text"]),
      taxonomyComponent("cause-trigger", "Cause / trigger evidence", ["cause", "trigger", "object of emotion"]),
      taxonomyComponent("cause-linkage", "Cause-emotion linkage / structure", ["emotion-cause", "cause-effect", "cause type", "cause span", "cause pair", "causal relation"]),
      taxonomyComponent("appraisal-labels", "Appraisal labels", ["appraisal"]),
      taxonomyComponent("interpretive-reasoning", "Interpretive / situational reasoning", ["situational reasoning", "interpretive", "evidence-grounded reasoning"]),
      taxonomyComponent("descriptive-account", "Descriptive account / status", ["description", "descriptive account", "status"]),
      taxonomyComponent("coping-reaction", "Coping / reaction response", ["coping", "regulation", "response"]),
      taxonomyComponent("reasoning-quality", "Reasoning quality / evaluation", ["reasoning quality", "evaluation", "quality"]),
      taxonomyComponent("clinical-rationale", "Clinical rationale", ["clinical rationale", "expert rationale"])
    ],
    papers: ["p17","p02","p03","p08","p13","p19","p32","p41","p16","p34","p14","p10","p15","p21","p23","p33","p29","p09","p18","p20","p11","p01","p43"]
  },
  {
    id: "multimodal-evidence",
    title: "Multimodal, Behavioral, and Signal Evidence",
    shortTitle: "Evidence",
    mark: "S",
    accent: "rose",
    occurrenceCount: 28,
    summary: "Observable or sensor-derived evidence used to support affect labels, including visual, bodily, and action cues, facial action units or landmarks, audio or speech information, and biosignals.",
    anchors: "visual/body/action descriptors; modality/channel labels; facial AU/landmarks; audio/speech descriptors",
    bullets: [
      "visible action, body movement, posture, gesture, or non-verbal behaviour",
      "facial action units, landmarks, face regions, or facial geometry",
      "audio tone, speech, prosody, or sound-based descriptions",
      "text/audio/visual/multimodal channel or cue-source labels",
      "sensor-derived or behavioural evidence used to support affect labels"
    ],
    components: [
      taxonomyComponent("visual-facial", "Visual / facial cues", ["facial", "face", "action unit", "landmark", "eye", "mouth", "visual cue", "visual evidence", "image cue"]),
      taxonomyComponent("body-action", "Body / posture / gesture / action", ["body", "posture", "gesture", "action", "motion", "non-verbal", "observable behaviour"]),
      taxonomyComponent("audio-acoustic", "Audio / acoustic cues", ["audio tone", "acoustic", "audio", "prosody", "speech"]),
      taxonomyComponent("text-linguistic", "Text / linguistic cues", ["text cue", "linguistic cue", "text evidence", "utterance", "word"]),
      taxonomyComponent("multimodal-attribution", "Multimodal cue attribution / integration", ["modality", "multimodal", "audio and visual", "acoustic, visual and text", "visual and context cues", "cue source"]),
      taxonomyComponent("physical-physiological", "Physical / physiological signals", ["physical signal", "physiological", "biosignal", "sensor"])
    ],
    papers: ["p06","p07","p13","p22","p34","p40","p14","p23","p12","p29","p11","p27","p01","p38","p37"]
  },
  {
    id: "person-level-traits",
    title: "Personality and Person-level Trait Labels",
    shortTitle: "Person traits",
    mark: "P",
    accent: "teal",
    occurrenceCount: 8,
    summary: "Stable person-level characteristics, such as personality, persona, character traits, or enduring individual differences.",
    anchors: "personality; psychological wellbeing; character traits; consumer and behavioural traits",
    bullets: ["personality dimensions", "psychological wellbeing", "character descriptions and story roles", "consumer and behavioural traits"],
    components: [
      taxonomyComponent("personality", "Personality", ["personality"]),
      taxonomyComponent("well-being", "Psychological well-being", ["well-being"]),
      taxonomyComponent("persona-character", "Persona / character traits", ["global persona", "character", "story role"]),
      taxonomyComponent("decision-tendencies", "Decision-making tendencies", ["consumer purchasing", "decision-making", "personality trait"])
    ],
    papers: ["p17","p16","p34","p29","p18","p43"]
  },
  {
    id: "event-centred",
    title: "Event-centred Intent, Effect, and Reaction Labels",
    shortTitle: "Event labels",
    mark: "I",
    accent: "indigo",
    occurrenceCount: 7,
    summary: "Labels that describe inferred intent, effect, or reaction of the speaker or others around an affective event.",
    anchors: "speaker or purchasing intent; effects on speaker or others; reactions; COMET commonsense cues",
    bullets: ["speaker or purchasing intent", "effect on the speaker or other people", "speaker and other-person reactions", "COMET commonsense event cues"],
    components: [
      taxonomyComponent("speaker-intent", "Speaker intent", ["speaker intent", "purchasing intension"]),
      taxonomyComponent("effects", "Effects on self & others", ["effect on speaker", "effect on others"]),
      taxonomyComponent("reactions", "Reactions", ["reaction of others", "speaker reaction", "reaction text"]),
      taxonomyComponent("commonsense", "COMET commonsense cues", ["comet commonsense"])
    ],
    papers: ["p10","p18","p26"]
  },
  {
    id: "annotation-perspective",
    title: "Annotation Perspective",
    shortTitle: "Perspective",
    mark: "V",
    accent: "fuchsia",
    occurrenceCount: 3,
    summary: "Explicit information that records the more than one viewpoint from which an affective judgement should be interpreted.",
    anchors: "speaker view; experiencer view; perspective shifts",
    bullets: ["annotation from the speaker’s view", "experiencer-view metadata", "shifts in how a speaker sees or understands a topic"],
    components: [
      taxonomyComponent("speaker-experiencer", "Speaker / experiencer view", ["speaker’s view", "experiencer view"]),
      taxonomyComponent("perspective-shifts", "Perspective shifts", ["perspectives: shifts"])
    ],
    papers: ["p02","p14","p01"]
  }
];

const sourceFilters = [
  {
    id: "annotated",
    title: "Human annotated",
    description: "Human annotated / self-reported",
    mark: "H",
    papers: ["p01","p17","p02","p03","p34","p21","p23","p12","p18","p43"]
  },
  {
    id: "generated",
    title: "Algorithm generated",
    description: "Algorithm-generated",
    mark: "A",
    papers: ["p19","p22","p40","p33"]
  },
  {
    id: "hybrid",
    title: "Hybrid",
    description: "Human-algorithm",
    mark: "M",
    papers: ["p06","p07","p08","p13","p32","p41","p16","p35","p14","p10","p15","p29","p09","p26","p20","p11","p27","p38","p37"]
  }
];

const activePaperIds = Array.from(new Set(level2Categories.flatMap((category) => category.papers)));

const paperEnrichment = {
  "p06": [
    "Categorical emotion: 13 categories",
    "Environmental setting descriptors",
    "Perceived demographic and role information",
    "Relationship and social interaction descriptors",
    "Body, hand, and posture signals",
    "Face and eye/mouth/facial landmarks"
  ],
  "p17": [
    "Intensity of each affect category",
    "Categorical emotion: 20 categories",
    "Dimensions: Valence, Arousal, Dominance",
    "Likeness: how much participant like the video content",
    "The familiarity of participants with video content",
    "Affective rationale/explanation: text description",
    "Personality of participants",
    "Psychological well-being"
  ],
  "p02": [
    "Emotion intensity",
    "Categorical emotion: 6 categories",
    "Emotion subclasses: emotions derived from 6 basic emotions",
    "Multi-label emotion annotation",
    "Sentence structure is considered in annotation",
    "Emotion cause-effect relation",
    "Annotated considering speaker’s view"
  ],
  "p03": [
    "Dimensional ratings: emotional valence; confidence",
    "Desire to stop (exercise)",
    "exertion",
    "pain level",
    "worry",
    "Think-aloud explanation of the reason of rating",
    "Think-aloud description of the current status"
  ],
  "p07": [
    "Categorical emotion: 26 categories",
    "Multi-label emotion labels",
    "Environmental / location descriptors",
    "Age / gender / role descriptors",
    "Human interaction descriptors",
    "Action descriptors",
    "Physical signal descriptors"
  ],
  "p08": [
    "Categorical emotion: 8 categories",
    "Emotion distribution",
    "Relabelling (emotion distribution) reasons",
    "Typed free text keywords to describe emotions"
  ],
  "p13": [
    "Categorical emotion: 9 categories",
    "Lexical subtitle",
    "Rationale of why the emotion label applies",
    "Visual objective description",
    "Audio tone description",
    "Facial action unit and peak-frame (emotion) information",
    "Visual expression description"
  ],
  "p19": [
    "Categorical emotion: 10 IEMOCAP emotion categories; 7 MELD-ER emotion categories",
    "Natural language sentence with emotion, e.g. the speaker is feeling angry",
    "3 MELD-SR sentiment categories",
    "Evidence-grounded reasoning: justify emotional state from utterances",
    "Interpretive reasoning: explanation via intent or state",
    "Reasoning-quality scores"
  ],
  "p32": [
    "Categorical emotion: 10 emotions",
    "9 DSM-5 depression symptoms",
    "Original BDI-II depression severity",
    "Publisher information",
    "Time",
    "Location",
    "Clinical rationale from psychologist",
    "LLM generated clinical rationale"
  ],
  "p41": [
    "Sentiment: 3 sentiments",
    "Soft/probabilistic affect labels",
    "Natural language explanations: reasons for sentiment labels"
  ],
  "p16": [
    "Categorical emotion: 128 emotion tags from primary emotion groups",
    "Context of the current scene",
    "Spoken text/lyrics/dialogue",
    "Character identity (speaker/singer)",
    "LLM reasoning about the situation",
    "character’s overall personality and story role"
  ],
  "p22": [
    "Categorical emotion: BoLD / EMOTIC 26 emotion categories",
    "VLLM-generated contextual descriptions",
    "visual context (facial/body cues)"
  ],
  "p34": [
    "Emotion intensity",
    "Categorical emotion: 16 Roseman’s emotions",
    "Self emotion ratings",
    "4 coping strategies: attack, contact, distance, reject",
    "Non-verbal behaviour description",
    "Character description"
  ],
  "p35": [
    "PAD values shift values",
    "Self-reported PAD emotions",
    "LLM-inferred pleasure score",
    "Scene details (conflict-scene)",
    "Speaker-role information",
    "18 parental behaviour codes",
    "7 parent-child conflict types"
  ],
  "p40": [
    "Multi-label affect: 13 categories from annotation ;6 categories for LLM predicted",
    "Environment descriptors",
    "Speaker information: gender/age",
    "Action evidence: physical signal"
  ],
  "p14": [
    "Emotion labels at pre-point and post-point",
    "Emotion labels at the moment of turning point",
    "Turning point type: 5 categories",
    "LLaVA-generated visual descriptions",
    "Turning point timestamp",
    "Cause of turning point",
    "Visual evidence: facial expressions, actions, postures and gestures",
    "Perspectives: Shifts in the way a speaker sees or understands a topic"
  ],
  "p10": [
    "Categorical emotion: 6 emotion categories",
    "Emotion cause type (objective vs. subjective)",
    "Cause evidence in the utterance",
    "Emotion-cause utterance pairs (linking emotion to its cause)",
    "Specific words in the utterance that lead to causes",
    "COMET commonsense cues: generated react phrases used in experiments"
  ],
  "p15": [
    "Categorical emotion: 6 emotion categories",
    "Speaker’s identity",
    "MECPE multimodal emotion-cause pairs: linking emotion utterance to a cause utterance using language, audio and vision",
    "Specific words in the utterance that lead to causes",
    "Cause evidence in the utterance"
  ],
  "p21": [
    "Categorical emotion: 7 emotions categories",
    "Individual cause: Text describing part or all of the emotion cause",
    "Aggregated causes: complete causes formed by combining multiple individual causes",
    "Emotion-cause pairs: pairs between emotion utterance and each individual cause span.",
    "Implicit cause: used when no explicit evidence shown in the conversation"
  ],
  "p23": [
    "Categorical emotion: 6 emotion categories",
    "Speaker identity",
    "Emotion cause type labels; utter-cause-emotion triplets",
    "Modality-cause cue labels: whether the cause inference is based on text, audio or video"
  ],
  "p12": [
    "Categorical emotion: 11 emotion categories",
    "Compound emotion labels: 32 multiple expression labels",
    "Generated bilingual (Chinese and English) emotional descriptive texts",
    "Participant gender",
    "Facial landmark: face regions and frame-level 68 facial landmarks"
  ],
  "p33": [
    "Categorical emotion: 28 emotion categories",
    "Soft emotion labels: multiple emotions can be attached to one utterance with scores from 0 to 1, e.g. anger 1.0, caring 1.0, confusion 0.5 and desire 0.8 for the same utterance",
    "Generated narrative story/context",
    "Actor/character identity",
    "Emotion reasoning: short explanation of why each emotion label fits the utterance"
  ],
  "p29": [
    "Categorical emotion: 14 emotion categories",
    "Short-term context: nearby sentences before/after the emotion moment",
    "Speaker status: speaker/non-speaker",
    "Emotion moment: the time point target person’s emotion is judged",
    "Annotator’s annotation reason",
    "Emotion annotation reason justified using text, audio, visual and context cues",
    "Personality knowledge"
  ],
  "p09": [
    "Emotion flip labels: emotion changes between two consecutive utterances, e.g. fear → joy",
    "Categorical emotion: MELD 8 emotion categories",
    "Speaker’s identity",
    "Appraisal labels: 27 categories: include nervousness, adoration, annoyance…"
  ],
  "p18": [
    "Emotion intensity ratings: 7-point Likert scale",
    "Categorical emotion: 9 emotion labels",
    "Participant demographic information",
    "Product context: product recalled, cost",
    "20 cognitive appraisal ratings (1-7)",
    "Personality trait",
    "Consumer purchasing habits",
    "Purchasing intension"
  ],
  "p26": [
    "Categorical emotion: 28 emotion categories",
    "Multi-label emotion classes: marked present/absent",
    "Effect on others",
    "Effect on speaker",
    "Reaction of others",
    "Speaker intent",
    "Speaker reaction"
  ],
  "p20": [
    "Categorical emotion: 7 emotion labels",
    "Speaker identity",
    "Binary causal utterance labels: if a historical utterance can be the cause of an emotional utterance"
  ],
  "p11": [
    "Categorical emotion: 7 emotion categories",
    "Emotion probability distribution: human annotated/generated",
    "Scenario information",
    "Performer identity",
    "LLM free-text explanations on how it interprets cues",
    "LLM free-text body motion description",
    "Body motion intensity"
  ],
  "p27": [
    "Categorical emotion: 26 BoLD; 7 CAER-S; EMOTIC 26 emotion categories",
    "Multi-label emotion labels: EMOTIC 26 emotion categories",
    "Image/background information",
    "Face and body posture"
  ],
  "p01": [
    "Emotion turning point",
    "Intensity",
    "Categorical emotion:",
    "Dimensional emotion values",
    "Compound emotions",
    "Emotion-related state: pain, depression",
    "Social context",
    "Person information",
    "Acting / authenticity",
    "Appraisal scales",
    "Emotion trigger / cause",
    "Object of emotion",
    "Modality information",
    "Observable behaviour",
    "Experiencer view"
  ],
  "p38": [
    "Intensity values",
    "Multi-label emotion categories",
    "Sentiment labels",
    "Dialogue history context",
    "Multi-modality evidence: audio and visual"
  ],
  "p43": [
    "Emotion intensity",
    "Distress",
    "Emotion polarity",
    "Multi-label emotion labels: 8 categories",
    "Empathy",
    "Demographic information of participants",
    "Reaction text after reading",
    "Personality of essay writer"
  ],
  "p37": [
    "Valance and Arousal scores",
    "Multi-label emotion label: 7 categories",
    "VA scores from acoustic, visual and text cues"
  ]
};

const paperEnrichmentByCategory = {
  "p06": {
    "affective-state": [
      "Categorical emotion: 13 categories"
    ],
    "context-setting": [
      "Environmental setting descriptors",
      "Perceived demographic and role information",
      "Relationship and social interaction descriptors"
    ],
    "reasoning-causal": [],
    "multimodal-evidence": [
      "Body, hand, and posture signals",
      "Face and eye/mouth/facial landmarks"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p17": {
    "affective-state": [
      "Intensity of each affect category",
      "Categorical emotion: 20 categories",
      "Dimensions: Valence, Arousal, Dominance",
      "Likeness: how much participant like the video content"
    ],
    "context-setting": [
      "The familiarity of participants with video content"
    ],
    "reasoning-causal": [
      "Affective rationale/explanation: text description"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [
      "Personality of participants",
      "Psychological well-being"
    ],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p02": {
    "affective-state": [
      "Emotion intensity",
      "Categorical emotion: 6 categories",
      "Emotion subclasses: emotions derived from 6 basic emotions",
      "Multi-label emotion annotation"
    ],
    "context-setting": [
      "Sentence structure is considered in annotation"
    ],
    "reasoning-causal": [
      "Emotion cause-effect relation"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": [
      "Annotated considering speaker’s view"
    ]
  },
  "p03": {
    "affective-state": [
      "Dimensional ratings: emotional valence; confidence",
      "Desire to stop (exercise)",
      "exertion",
      "pain level",
      "worry"
    ],
    "context-setting": [],
    "reasoning-causal": [
      "Think-aloud explanation of the reason of rating",
      "Think-aloud description of the current status"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p07": {
    "affective-state": [
      "Categorical emotion: 26 categories",
      "Multi-label emotion labels"
    ],
    "context-setting": [
      "Environmental / location descriptors",
      "Age / gender / role descriptors",
      "Human interaction descriptors"
    ],
    "reasoning-causal": [],
    "multimodal-evidence": [
      "Action descriptors",
      "Physical signal descriptors"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p08": {
    "affective-state": [
      "Categorical emotion: 8 categories",
      "Emotion distribution"
    ],
    "context-setting": [],
    "reasoning-causal": [
      "Relabelling (emotion distribution) reasons",
      "Typed free text keywords to describe emotions"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p13": {
    "affective-state": [
      "Categorical emotion: 9 categories"
    ],
    "context-setting": [
      "Lexical subtitle"
    ],
    "reasoning-causal": [
      "Rationale of why the emotion label applies",
      "Visual objective description"
    ],
    "multimodal-evidence": [
      "Audio tone description",
      "Facial action unit and peak-frame (emotion) information",
      "Visual expression description"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p19": {
    "affective-state": [
      "Categorical emotion: 10 IEMOCAP emotion categories; 7 MELD-ER emotion categories",
      "Natural language sentence with emotion, e.g. the speaker is feeling angry",
      "3 MELD-SR sentiment categories"
    ],
    "context-setting": [],
    "reasoning-causal": [
      "Evidence-grounded reasoning: justify emotional state from utterances",
      "Interpretive reasoning: explanation via intent or state",
      "Reasoning-quality scores"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p32": {
    "affective-state": [
      "Categorical emotion: 10 emotions",
      "9 DSM-5 depression symptoms",
      "Original BDI-II depression severity"
    ],
    "context-setting": [
      "Publisher information",
      "Time",
      "Location"
    ],
    "reasoning-causal": [
      "Clinical rationale from psychologist",
      "LLM generated clinical rationale"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p41": {
    "affective-state": [
      "Sentiment: 3 sentiments",
      "Soft/probabilistic affect labels"
    ],
    "context-setting": [],
    "reasoning-causal": [
      "Natural language explanations: reasons for sentiment labels"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p16": {
    "affective-state": [
      "Categorical emotion: 128 emotion tags from primary emotion groups"
    ],
    "context-setting": [
      "Context of the current scene",
      "Spoken text/lyrics/dialogue",
      "Character identity (speaker/singer)"
    ],
    "reasoning-causal": [
      "LLM reasoning about the situation"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [
      "character’s overall personality and story role"
    ],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p22": {
    "affective-state": [
      "Categorical emotion: BoLD / EMOTIC 26 emotion categories"
    ],
    "context-setting": [
      "VLLM-generated contextual descriptions"
    ],
    "reasoning-causal": [],
    "multimodal-evidence": [
      "visual context (facial/body cues)"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p34": {
    "affective-state": [
      "Emotion intensity",
      "Categorical emotion: 16 Roseman’s emotions",
      "Self emotion ratings"
    ],
    "context-setting": [],
    "reasoning-causal": [
      "4 coping strategies: attack, contact, distance, reject"
    ],
    "multimodal-evidence": [
      "Non-verbal behaviour description"
    ],
    "person-level-traits": [
      "Character description"
    ],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p35": {
    "affective-state": [
      "PAD values shift values",
      "Self-reported PAD emotions",
      "LLM-inferred pleasure score"
    ],
    "context-setting": [
      "Scene details (conflict-scene)",
      "Speaker-role information",
      "18 parental behaviour codes",
      "7 parent-child conflict types"
    ],
    "reasoning-causal": [],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p40": {
    "affective-state": [
      "Multi-label affect: 13 categories from annotation ;6 categories for LLM predicted"
    ],
    "context-setting": [
      "Environment descriptors",
      "Speaker information: gender/age"
    ],
    "reasoning-causal": [],
    "multimodal-evidence": [
      "Action evidence: physical signal"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p14": {
    "affective-state": [
      "Emotion labels at pre-point and post-point",
      "Emotion labels at the moment of turning point",
      "Turning point type: 5 categories"
    ],
    "context-setting": [
      "LLaVA-generated visual descriptions",
      "Turning point timestamp"
    ],
    "reasoning-causal": [
      "Cause of turning point"
    ],
    "multimodal-evidence": [
      "Visual evidence: facial expressions, actions, postures and gestures"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": [
      "Perspectives: Shifts in the way a speaker sees or understands a topic"
    ]
  },
  "p10": {
    "affective-state": [
      "Categorical emotion: 6 emotion categories"
    ],
    "context-setting": [],
    "reasoning-causal": [
      "Emotion cause type (objective vs. subjective)",
      "Cause evidence in the utterance",
      "Emotion-cause utterance pairs (linking emotion to its cause)",
      "Specific words in the utterance that lead to causes"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [
      "COMET commonsense cues: generated react phrases used in experiments"
    ],
    "annotation-perspective": []
  },
  "p15": {
    "affective-state": [
      "Categorical emotion: 6 emotion categories"
    ],
    "context-setting": [
      "Speaker’s identity"
    ],
    "reasoning-causal": [
      "MECPE multimodal emotion-cause pairs: linking emotion utterance to a cause utterance using language, audio and vision",
      "Specific words in the utterance that lead to causes",
      "Cause evidence in the utterance"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p21": {
    "affective-state": [
      "Categorical emotion: 7 emotions categories"
    ],
    "context-setting": [],
    "reasoning-causal": [
      "Individual cause: Text describing part or all of the emotion cause",
      "Aggregated causes: complete causes formed by combining multiple individual causes",
      "Emotion-cause pairs: pairs between emotion utterance and each individual cause span.",
      "Implicit cause: used when no explicit evidence shown in the conversation"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p23": {
    "affective-state": [
      "Categorical emotion: 6 emotion categories"
    ],
    "context-setting": [
      "Speaker identity"
    ],
    "reasoning-causal": [
      "Emotion cause type labels; utter-cause-emotion triplets"
    ],
    "multimodal-evidence": [
      "Modality-cause cue labels: whether the cause inference is based on text, audio or video"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p12": {
    "affective-state": [
      "Categorical emotion: 11 emotion categories",
      "Compound emotion labels: 32 multiple expression labels"
    ],
    "context-setting": [
      "Generated bilingual (Chinese and English) emotional descriptive texts",
      "Participant gender"
    ],
    "reasoning-causal": [],
    "multimodal-evidence": [
      "Facial landmark: face regions and frame-level 68 facial landmarks"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p33": {
    "affective-state": [
      "Categorical emotion: 28 emotion categories",
      "Soft emotion labels: multiple emotions can be attached to one utterance with scores from 0 to 1, e.g. anger 1.0, caring 1.0, confusion 0.5 and desire 0.8 for the same utterance"
    ],
    "context-setting": [
      "Generated narrative story/context",
      "Actor/character identity"
    ],
    "reasoning-causal": [
      "Emotion reasoning: short explanation of why each emotion label fits the utterance"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p29": {
    "affective-state": [
      "Categorical emotion: 14 emotion categories"
    ],
    "context-setting": [
      "Short-term context: nearby sentences before/after the emotion moment",
      "Speaker status: speaker/non-speaker",
      "Emotion moment: the time point target person’s emotion is judged"
    ],
    "reasoning-causal": [
      "Annotator’s annotation reason"
    ],
    "multimodal-evidence": [
      "Emotion annotation reason justified using text, audio, visual and context cues"
    ],
    "person-level-traits": [
      "Personality knowledge"
    ],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p09": {
    "affective-state": [
      "Emotion flip labels: emotion changes between two consecutive utterances, e.g. fear → joy",
      "Categorical emotion: MELD 8 emotion categories"
    ],
    "context-setting": [
      "Speaker’s identity"
    ],
    "reasoning-causal": [
      "Appraisal labels: 27 categories: include nervousness, adoration, annoyance…"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p18": {
    "affective-state": [
      "Emotion intensity ratings: 7-point Likert scale",
      "Categorical emotion: 9 emotion labels"
    ],
    "context-setting": [
      "Participant demographic information",
      "Product context: product recalled, cost"
    ],
    "reasoning-causal": [
      "20 cognitive appraisal ratings (1-7)"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [
      "Personality trait",
      "Consumer purchasing habits"
    ],
    "event-centred": [
      "Purchasing intension"
    ],
    "annotation-perspective": []
  },
  "p26": {
    "affective-state": [
      "Categorical emotion: 28 emotion categories",
      "Multi-label emotion classes: marked present/absent"
    ],
    "context-setting": [],
    "reasoning-causal": [],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [
      "Effect on others",
      "Effect on speaker",
      "Reaction of others",
      "Speaker intent",
      "Speaker reaction"
    ],
    "annotation-perspective": []
  },
  "p20": {
    "affective-state": [
      "Categorical emotion: 7 emotion labels"
    ],
    "context-setting": [
      "Speaker identity"
    ],
    "reasoning-causal": [
      "Binary causal utterance labels: if a historical utterance can be the cause of an emotional utterance"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p11": {
    "affective-state": [
      "Categorical emotion: 7 emotion categories",
      "Emotion probability distribution: human annotated/generated"
    ],
    "context-setting": [
      "Scenario information",
      "Performer identity"
    ],
    "reasoning-causal": [
      "LLM free-text explanations on how it interprets cues",
      "LLM free-text body motion description"
    ],
    "multimodal-evidence": [
      "Body motion intensity"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p27": {
    "affective-state": [
      "Categorical emotion: 26 BoLD; 7 CAER-S; EMOTIC 26 emotion categories",
      "Multi-label emotion labels: EMOTIC 26 emotion categories"
    ],
    "context-setting": [
      "Image/background information"
    ],
    "reasoning-causal": [],
    "multimodal-evidence": [
      "Face and body posture"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p01": {
    "affective-state": [
      "Emotion turning point",
      "Intensity",
      "Categorical emotion:",
      "Dimensional emotion values",
      "Compound emotions",
      "Emotion-related state: pain, depression"
    ],
    "context-setting": [
      "Social context",
      "Person information",
      "Acting / authenticity"
    ],
    "reasoning-causal": [
      "Appraisal scales",
      "Emotion trigger / cause",
      "Object of emotion"
    ],
    "multimodal-evidence": [
      "Modality information",
      "Observable behaviour"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": [
      "Experiencer view"
    ]
  },
  "p38": {
    "affective-state": [
      "Intensity values",
      "Multi-label emotion categories",
      "Sentiment labels"
    ],
    "context-setting": [
      "Dialogue history context"
    ],
    "reasoning-causal": [],
    "multimodal-evidence": [
      "Multi-modality evidence: audio and visual"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p43": {
    "affective-state": [
      "Emotion intensity",
      "Distress",
      "Emotion polarity",
      "Multi-label emotion labels: 8 categories",
      "Empathy"
    ],
    "context-setting": [
      "Demographic information of participants"
    ],
    "reasoning-causal": [
      "Reaction text after reading"
    ],
    "multimodal-evidence": [],
    "person-level-traits": [
      "Personality of essay writer"
    ],
    "event-centred": [],
    "annotation-perspective": []
  },
  "p37": {
    "affective-state": [
      "Valance and Arousal scores",
      "Multi-label emotion label: 7 categories"
    ],
    "context-setting": [],
    "reasoning-causal": [],
    "multimodal-evidence": [
      "VA scores from acoustic, visual and text cues"
    ],
    "person-level-traits": [],
    "event-centred": [],
    "annotation-perspective": []
  }
};

const paperGenerationDetails = {
  "p06": [
    "Image descriptors: annotated by observers (n=2).",
    "Sence descriptive sentence: generated by automatic fill-in-the-blank templates based on the descriptor categories.",
    "Base affect labels: inherited from the existing EMOTIC dataset."
  ],
  "p17": [
    "Emotion labels: self-report by participant during VR video watching."
  ],
  "p02": [
    "Affect labels: annotate by human annotators."
  ],
  "p03": [
    "Affect labels: self-reported by participants.",
    "Contextual explanations: collected from participants’ think-aloud responses.",
    "Reflective labels: collected through semi-structured interviews on participants."
  ],
  "p07": [
    "Narrative descriptors: generated using CLIP.",
    "LLaVA fine-tuned captions: human annotated.",
    "Base affect labels: 26 categorical from original EMOTIC dataset."
  ],
  "p08": [
    "Original emotion distributions: rated by at least five human raters from MSP-PODCAST dataset.",
    "Typed descriptions: written by human annotators in natural language.",
    "Adjusted labels/distributions and relabelling reasons: generated by ChatGPT / GPT-4 Turbo.",
    "Other label information: generated by ChatGPT."
  ],
  "p13": [
    "Coarse-grained emotion annotation and synthesised reasoning labels: generated by LLaMA-3.",
    "Fine-grained emotion reasoning: annotated by experts.",
    "Visual expression / Action Unit cues: generated by OpenFace.",
    "Visual objective/context descriptions: generated by MiniGPT-v2 from video frames.",
    "Audio tone descriptions: generated by Qwen-Audio.",
    "Lexical subtitles: taken from the original series video."
  ],
  "p19": [
    "Label-only sentences; Interpretive reasoning; Evidence-grounded reasoning: generated by Gemma-2-9B-IT.",
    "Reasoning-quality scores: generated by Llama-3-70B-Instruct."
  ],
  "p32": [
    "Affect/depression labels: annotated by experts.",
    "DSM-5 related labels and evidence: expert annotated and partly drawn from the existing DepreSym dataset.",
    "Time/People/Locations: extracted using Named Entity Recognition (NER) from posts.",
    "BDI-II to DSM-5 mapping: performed by experts.",
    "Generated labels/rationales: produced by Gemma-3 27B in a few-shot setup."
  ],
  "p41": [
    "Natural-language explanations: human annotated.",
    "Sentiment polarity base labels: from the SemEval 2014 Task 4 customer-review datasets.",
    "Noisy labels: produced by labelling functions, a filter bank, and a label aggregator."
  ],
  "p16": [
    "Emotion labels: generated by GPT-3.5 Turbo and DSPy modules.",
    "Speaker identity: produced using WeSpeaker and manually checked.",
    "Character/text/timestamps: taken from aligned and manually corrected subtitle files.",
    "Global persona and scene summaries: generated from full scripts by LLMs.",
    "Additional annotation outputs: generated by one of the DSPy modules."
  ],
  "p22": [
    "Contextual descriptions (Scene/context/body/facial cues): generated by LLaVA-1.5",
    "Alternative generated descriptions: GPT-4V descriptions are tested in ablation."
  ],
  "p34": [
    "Emotion intensity, Roseman emotions, and self-emotion ratings: annotated by crowdworkers.",
    "Coping-related categories: drawn from Roseman’s coping theory.",
    "Role-playing labels: provided by crowdworkers during the role-playing task."
  ],
  "p35": [
    "PAD/emotion sources: parents’ daily self-report.",
    "Dialogue-derived pleasure labels: generated by EmoLLaMA-chat-7B from transcribed dialogue.",
    "PAD change labels: computed from post-homework minus pre-homework PAD self-reports.",
    "Behaviour/conflict coding: generated by GPT-4o, with samples validated by experts.",
    "Speaker-role/transcript labels: from Xunfei for transcription, GPT-4o for transcript correction and role recognition."
  ],
  "p40": [
    "Model-predicted labels: generated by CLIP, GPT-4, GPT-4 Vision, Mistral, and LLaVA.",
    "Contextual descriptors (gender/age, action labels, physical signals, and environment): by CLIP from predefined descriptor lists."
  ],
  "p14": [
    "Affective-state and turning-point labels: annotated by human annotators.",
    "Cause/change/evidence labels: annotated by two human annotators, reviewed by a third annotator/judge.",
    "Visual-textual evidence: human-selected from transcript and video cues.",
    "Rationales: generated by ChatGPT.",
    "Scene descriptions: generated by LLaVA and summarised by GPT-3.5."
  ],
  "p10": [
    "Multimodal cause labels: annotated by three trained annotators.",
    "Commonsense cue labels: generated by ATOMIC20.",
    "Base emotion labels: from MELD / EmotionLines dataset."
  ],
  "p15": [
    "Cause-related task labels: defined by the challenge/task.",
    "Cause annotations: annotated by three graduate annotators.",
    "Extended data: partly labelled by humans and partly generated by ATOMIC20.",
    "Base emotion labels: from MELD / EmotionLines dataset."
  ],
  "p21": [
    "Emotion-cause evidence labels: annotated by two graduate annotators.",
    "Emotion-cause pairing: created using an emotion-cause pairing rule by annotator.",
    "Base emotion labels: inherit from DailyDialog dataset."
  ],
  "p23": [
    "Cause labels: annotated by 10 psychology graduate students.",
    "Speaker information: from M3ED dataset.",
    "Emotion categories: defined using Ekman-style basic emotions."
  ],
  "p12": [
    "Compound affect labels: provided by 11 trained annotators.",
    "Descriptive/other labels: provided by 11 trained annotators."
  ],
  "p33": [
    "Emotion label conditions: selected from the 28-category GoEmotions dataset.",
    "Narrative/context and rationale/explication labels: generated by Mistral.",
    "Source text: drawn from the WikiPlots corpus."
  ],
  "p29": [
    "Clip-level affect labels: created by three annotators.",
    "Speaker/non-speaker and cue-source labels: produced by human annotators.",
    "Transcript-speaker-timestamp: computed from aligned transcript metadata.",
    "Personality/contextual knowledge: created by a psychology-aware TBBT fan.",
    "Reasoning labels: produced by human annotators."
  ],
  "p09": [
    "Emotion flip labels: automatically derived by the authors from MELD speaker and emotion labels.",
    "Flip relation source: computed from speaker labels and utterance emotion labels.",
    "Speaker metadata: from the original MELD dataset."
  ],
  "p18": [
    "Affect/appraisal labels: first-person self-reports from participants.",
    "Trait, purchase/behavioural, and demographic labels: self-reported through questionnaires."
  ],
  "p26": [
    "Multi-perspective common-sense labels: generated automatically by COMET using the input text.",
    "Constructed emotion-label information: from GoEmotions labels."
  ],
  "p20": [
    "Conversation graph nodes: model-constructed representations.",
    "Graph edge types: designed by the authors to encode global, speaker, and local-context relations.",
    "Causal utterance labels: inherited from annotations in RECCON-DD and ConvECPE dataset.",
    "Speaker labels: inherited from the original conversation datasets."
  ],
  "p11": [
    "Performer-intended emotions: self-reported by performers in the GEMEP-GEneva dataset.",
    "Human-perceived emotions: selected by 22 human observers.",
    "LLM-perceived emotions and probability outputs: generated by GPT-4.1.",
    "Scenario text: written by performers.",
    "Descriptive/context labels: written by one annotator or generated by GPT-4.1.",
    "Experimental context conditions: designed by the authors."
  ],
  "p27": [
    "Entity context: generated by Faster R-CNN / ResNeXt-101-FPN and RoIAlign.",
    "Global context: generated from multiscale FPN feature maps.",
    "Scene graph context: generated by an unbiased scene graph generation method / MOTIFS trained on Visual Genome.",
    "Target-person boxes: provided by EMOTIC dataset."
  ],
  "p38": [
    "Audio representations: extracted using pretrained VGGish.",
    "Visual representations: extracted from the middle frame using ResNet-101.",
    "Dialogue-history/context representation: model-constructed from the utterance.",
    "Base multimodal/emotion labels: taken from MEISD dataset."
  ],
  "p43": [
    "Emotion labels: annotated.",
    "Essay-level emotion labels: annotated by annotators.",
    "Personality labels: self-reported through the Ten Item Personality Inventory.",
    "Trait empathy labels: self-reported through the Interpersonal Reactivity Index.",
    "Essays and demographic information: collected from MTurk workers through Qualtrics setup."
  ],
  "p37": [
    "Base annotations: taken from MOSEI and M3ED dataset.",
    "Emotion-category-level VA values: taken from the human-rated NRC-VAD lexicon.",
    "Modality-specific VA signals: generated by RoBERTa fine-tuned on EmoBank, EmoFAN trained on AffectNet, and Wav2Vec2-Large-Robust fine-tuned on MSP-Podcast.",
    "Emotion-similarity labels: computed from cosine similarity between category VA vectors.",
    "Modality-relevance labels: algorithm-derived using Euclidean distance between modality-specific VA scores and threshold δ."
  ],
  "p01": [
    "Representation requirements and schema fields were specified by the paper authors."
  ]
};

const categoryStyles = {
  amber: {
    icon: "bg-amber-100",
    count: "bg-amber-100 text-amber-700",
    active: "border-amber-400 bg-amber-50"
  },
  emerald: {
    icon: "bg-emerald-100",
    count: "bg-emerald-100 text-emerald-700",
    active: "border-emerald-400 bg-emerald-50"
  },
  rose: {
    icon: "bg-rose-100",
    count: "bg-rose-100 text-rose-700",
    active: "border-rose-400 bg-rose-50"
  },
  sky: {
    icon: "bg-sky-100",
    count: "bg-sky-100 text-sky-700",
    active: "border-sky-400 bg-sky-50"
  },
  violet: {
    icon: "bg-violet-100",
    count: "bg-violet-100 text-violet-700",
    active: "border-violet-400 bg-violet-50"
  },
  teal: {
    icon: "bg-teal-100",
    count: "bg-teal-100 text-teal-700",
    active: "border-teal-400 bg-teal-50"
  },
  indigo: {
    icon: "bg-indigo-100",
    count: "bg-indigo-100 text-indigo-700",
    active: "border-indigo-400 bg-indigo-50"
  },
  fuchsia: {
    icon: "bg-fuchsia-100",
    count: "bg-fuchsia-100 text-fuchsia-700",
    active: "border-fuchsia-400 bg-fuchsia-50"
  }
};

const uniquePaperCount = activePaperIds.length;
const totalCategoryCount = level2Categories.length;
const allPaperIds = activePaperIds;

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function getPaper(id) {
  return {
    id,
    ...papers[id],
    ...(paperBibliography[id] || {}),
    exactlyEnriched: paperEnrichment[id] || [],
    enrichmentByCategory: paperEnrichmentByCategory[id] || {},
    generationDetails: paperGenerationDetails[id] || [],
    sourceLabel: sourceFilters.find((source) => source.papers.includes(id))?.description || "Not specified in the latest source table"
  };
}

function getComponentPaperIds(category, component) {
  if (!category || !component) return [];
  if (component.paperIds?.length) {
    return component.paperIds.filter((id) => category.papers.includes(id));
  }
  const keywords = component.keywords.map((keyword) => keyword.toLowerCase());

  const matchedIds = category.papers.filter((id) => {
    const paper = getPaper(id);
    const searchableText = (paper.enrichmentByCategory[category.id] || [])
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return keywords.some((keyword) => searchableText.includes(keyword));
  });

  return matchedIds;
}

function getMatchingPaperIds(selectedSource, selectedCategory, selectedComponent) {
  const baseIds = selectedCategory
    ? selectedComponent
      ? getComponentPaperIds(selectedCategory, selectedComponent)
      : selectedCategory.papers
    : allPaperIds;

  if (!selectedSource) {
    return baseIds;
  }

  const sourceSet = new Set(selectedSource.papers);
  return baseIds.filter((id) => sourceSet.has(id));
}

function SourceButton({ source, selectedSource, selectedCategory, onSelect }) {
  const active = selectedSource?.id === source.id;
  const sourceSet = new Set(source.papers);
  const baseIds = selectedCategory ? selectedCategory.papers : allPaperIds;
  const count = baseIds.filter((id) => sourceSet.has(id)).length;

  return (
    <button
      onClick={() => onSelect(source)}
      className={cx(
        "flex min-h-20 items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition hover:-translate-y-0.5 hover:shadow-md",
        active ? "border-slate-950 bg-slate-950 text-white shadow-sm" : "border-slate-200 bg-white text-slate-900"
      )}
    >
      <span className="flex items-center gap-3">
        <span
          className={cx(
            "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold",
            active ? "bg-white text-slate-950" : "bg-slate-100 text-slate-600"
          )}
        >
          {source.mark}
        </span>
        <span>
          <span className="block text-base font-semibold">{source.title}</span>
          <span className={cx("mt-0.5 block text-[11px] font-medium", active ? "text-slate-300" : "text-slate-500")}>
            {source.description}
          </span>
        </span>
      </span>
      <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", active ? "bg-white text-slate-950" : "bg-slate-100 text-slate-600")}>
        {count}
      </span>
    </button>
  );
}

function CategoryButton({ category, selectedCategory, selectedSource, onSelect }) {
  const active = selectedCategory?.id === category.id;
  const styles = categoryStyles[category.accent];
  const sourceSet = selectedSource ? new Set(selectedSource.papers) : null;
  const count = sourceSet ? category.papers.filter((id) => sourceSet.has(id)).length : category.papers.length;

  return (
    <button
      onClick={() => onSelect(category)}
      className={cx(
        "flex min-h-24 flex-col justify-between rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md",
        active ? styles.active : "border-slate-200 bg-white"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={cx("flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold", styles.icon)}>{category.mark}</span>
        <span className={cx("rounded-full px-2 py-0.5 text-xs font-semibold", styles.count)}>{count}</span>
      </div>
      <div className="mt-3 text-sm font-semibold leading-tight text-slate-950">{category.shortTitle}</div>
    </button>
  );
}

function MatrixButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

function FilterPanel({ selectedSource, selectedCategory, onSourceSelect, onCategorySelect, onClear, onOpenMatrix }) {
  const hasSelection = Boolean(selectedSource || selectedCategory);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Filters</div>
        <button
          onClick={onClear}
          disabled={!hasSelection}
          className={cx(
            "rounded-full border px-3 py-1 text-xs font-semibold transition",
            hasSelection
              ? "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
          )}
        >
          Clear selection
        </button>
      </div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Label source</div>
        <MatrixButton onClick={() => onOpenMatrix("source")}>Open source table</MatrixButton>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {sourceFilters.map((source) => (
          <SourceButton
            key={source.id}
            source={source}
            selectedSource={selectedSource}
            selectedCategory={selectedCategory}
            onSelect={onSourceSelect}
          />
        ))}
      </div>
      <div className="mb-3 mt-5 flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Taxonomy</div>
        <MatrixButton onClick={() => onOpenMatrix("taxonomy")}>Open taxonomy table</MatrixButton>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {level2Categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            selectedCategory={selectedCategory}
            selectedSource={selectedSource}
            onSelect={onCategorySelect}
          />
        ))}
      </div>
      {selectedCategory ? (
        <div className={cx("mt-4 rounded-2xl border p-4", categoryStyles[selectedCategory.accent].active)}>
          <div className="flex items-center gap-3">
            <span className={cx("flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold", categoryStyles[selectedCategory.accent].icon)}>
              {selectedCategory.mark}
            </span>
            <div>
              <div className="text-sm font-semibold text-slate-950">{selectedCategory.title}</div>
            </div>
          </div>
          {selectedCategory.subcategories ? (
            <div className="mt-4 rounded-2xl bg-white/70 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Included in Other</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {selectedCategory.subcategories.map((subcategory) => {
                  const sourceSet = selectedSource ? new Set(selectedSource.papers) : null;
                  const matchingPapers = sourceSet
                    ? subcategory.papers.filter((id) => sourceSet.has(id))
                    : subcategory.papers;

                  return (
                    <div key={subcategory.title} className="rounded-xl border border-slate-200 bg-white p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold text-slate-950">{subcategory.title}</div>
                        <span className={cx("rounded-full px-2 py-0.5 text-xs font-semibold", categoryStyles[selectedCategory.accent].count)}>
                          {matchingPapers.length} papers
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function PapersPanel({ papersToShow, selectedSource, selectedCategory, selectedComponent, onClearComponent, onPaperClick }) {
  const styles = selectedCategory ? categoryStyles[selectedCategory.accent] : null;

  return (
    <div id="papers-panel" className="scroll-mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {selectedSource ? selectedSource.title : "All sources"}
          </span>
          <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", styles ? styles.count : "bg-slate-100 text-slate-600")}>
            {selectedCategory ? selectedCategory.title : "All richness types"}
          </span>
          {selectedComponent ? (
            <button
              type="button"
              onClick={onClearComponent}
              className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-700"
              aria-label={`Clear component filter ${selectedComponent.label}`}
            >
              {selectedComponent.label} <span className="ml-1 text-slate-300">×</span>
            </button>
          ) : null}
        </div>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold leading-tight text-slate-950">{papersToShow.length} matching papers</h2>
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Inclusive match</span>
        </div>
      </div>

      <div className="max-h-[34rem] overflow-y-auto p-4">
        <div className="grid gap-3">
          {papersToShow.map((paper) => (
            <button
              key={paper.id}
              onClick={() => onPaperClick(paper)}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-slate-500">{paper.year}</span>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">{paper.tag}</span>
              </div>
              <div className="mt-3 text-sm font-semibold leading-6 text-slate-950">{paper.title}</div>
              {paper.authors ? <div className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{paper.authors}</div> : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MatrixModal({ type, onClose }) {
  if (!type) return null;

  const isSourceMatrix = type === "source";
  const columns = isSourceMatrix ? sourceFilters : level2Categories;
  const title = isSourceMatrix ? "Label source table" : "Taxonomy table";
  const subtitle = isSourceMatrix
    ? "Each source option is a column. A check mark means the paper belongs to that source group."
    : "Each taxonomy option is a column. A check mark means the paper has at least one low-level label under that category.";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div>
            <h3 className="text-2xl font-semibold leading-tight text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="overflow-auto p-4">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 top-0 z-20 w-80 min-w-80 rounded-tl-2xl border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Article authors
                </th>
                {columns.map((column, index) => (
                  <th
                    key={column.id}
                    className={cx(
                      "sticky top-0 z-10 min-w-36 border-b border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500",
                      index === columns.length - 1 && "rounded-tr-2xl"
                    )}
                  >
                    <div>{column.shortTitle || column.title}</div>
                    <div className="mt-1 text-[11px] font-medium normal-case tracking-normal text-slate-400">{column.papers.length} papers</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPaperIds.map((id) => {
                const paper = getPaper(id);
                return (
                  <tr key={id} className="group">
                    <td className="sticky left-0 z-10 border-b border-slate-100 bg-white px-4 py-3 align-top group-hover:bg-slate-50">
                      <div className="text-sm font-semibold leading-5 text-slate-950">{paper.authors || "Unknown authors"}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-500">{paper.title}</div>
                    </td>
                    {columns.map((column) => {
                      const isChecked = column.papers.includes(id);
                      const styles = column.accent ? categoryStyles[column.accent] : null;
                      return (
                        <td key={column.id} className="border-b border-slate-100 px-4 py-3 text-center align-middle group-hover:bg-slate-50">
                          {isChecked ? (
                            <span className={cx("inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold", styles ? styles.count : "bg-slate-900 text-white")}>
                              {"\u2713"}
                            </span>
                          ) : (
                            <span className="text-slate-200">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PaperModal({ paper, onClose }) {
  if (!paper) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[calc(100vh-3rem)] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky -top-6 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white pb-4 pt-1">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{paper.year}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{paper.tag}</span>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{paper.sourceLabel}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-tight text-slate-950">{paper.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          <BibliographyBlock paper={paper} />
          {paper.exactlyEnriched.length ? <EnrichmentBlock items={paper.exactlyEnriched} /> : null}
          {paper.generationDetails.length ? <EnrichmentBlock label="How the richness was produced" items={paper.generationDetails} /> : null}
          <InfoBlock label="What it does" text={paper.summary} />
          <InfoBlock label="Richness mechanism" text={paper.richness} />
          <InfoBlock label="Use in thesis" text={paper.use} />
          <InfoBlock label="Gap / limitation" text={paper.caution} />
        </div>
      </div>
    </div>
  );
}

function EnrichmentBlock({ items, label = "What is exactly enriched" }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-sm font-semibold text-slate-950">{label}</div>
      <ul className="mt-2 space-y-2 pl-5 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item} className="list-disc">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BibliographyBlock({ paper }) {
  const hasLongTitle = paper.citationTitle && paper.citationTitle !== paper.title;
  const doiLink = paper.doi ? `https://doi.org/${paper.doi}` : null;

  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
        <span>Bibliographic details</span>
      </div>
      <div className="mt-3 grid gap-3">
        {hasLongTitle ? <MetaRow label="BibTeX title" value={paper.citationTitle} /> : null}
        {paper.authors ? <MetaRow label="Authors" value={paper.authors} /> : null}
        {paper.venue ? <MetaRow label="Venue" value={paper.venue} /> : null}
        {paper.doi ? <MetaRow label="DOI" value={paper.doi} href={doiLink} mono /> : null}
      </div>
    </div>
  );
}

function MetaRow({ label, value, href, mono = false }) {
  const className = cx("mt-1 text-sm leading-6 text-slate-700", mono && "break-all font-mono text-xs");

  return (
    <div className="rounded-xl bg-white p-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className={cx(className, "block text-sky-700 hover:text-sky-800 hover:underline")}>
          {value}
        </a>
      ) : (
        <div className={className}>{value}</div>
      )}
    </div>
  );
}

function InfoBlock({ label, text }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
        <span>{label}</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function MiniIllustration() {
  return (
    <div className="mx-auto mt-6 max-w-5xl">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-sm">
        <div className="absolute left-4 top-4 h-24 w-24 rounded-full bg-emerald-100/70 blur-2xl" />
        <div className="absolute bottom-4 right-8 h-28 w-28 rounded-full bg-sky-100/80 blur-2xl" />
        <div className="relative grid gap-6">
          <div>
            <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Review map
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              The taxonomy contains seven non-mutually-exclusive dimensions of rich affective ground truth.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {level2Categories.map((category) => {
              const styles = categoryStyles[category.accent];
              return (
                <div key={category.id} className={cx("rounded-2xl border p-4", styles.active)}>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <span>{category.mark}</span>
                    <span>{category.title}</span>
                  </div>
                  {category.subcategories ? (
                    <div className="mt-3 rounded-xl bg-white/70 px-3 py-2 text-xs font-semibold text-slate-600">
                      {category.subcategories.length} low-frequency subtypes
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaxonomyOrbit({ selectedSource, selectedCategory, selectedComponent, onCategorySelect, onComponentSelect }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50, tiltX: 0, tiltY: 0 });
  const activeCategory = level2Categories.find((category) => category.id === hoveredId) || selectedCategory || level2Categories[0];

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPointer({
      x,
      y,
      tiltX: (50 - y) / 28,
      tiltY: (x - 50) / 28
    });
  };

  const resetPointer = () => {
    setHoveredId(null);
    setPointer({ x: 50, y: 50, tiltX: 0, tiltY: 0 });
  };

  return (
    <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Scoping review taxonomy</div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">Seven forms of rich affective ground truth</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Move across the map to reveal specific components. Click a category or component to filter the papers below.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600">
          Hover to explore {"\u00B7"} click to filter
        </div>
      </div>

      <div className="taxonomy-scroll overflow-x-auto">
        <div
          className="taxonomy-stage relative mx-auto max-w-6xl overflow-hidden bg-slate-50"
          onMouseMove={handlePointerMove}
          onMouseLeave={resetPointer}
        >
        <div
          className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(14, 165, 233, 0.18), rgba(16, 185, 129, 0.07) 20%, transparent 42%)`
          }}
        />

          <div
            className="absolute inset-0 transition-transform duration-200 ease-out"
            style={{ transform: `perspective(1200px) rotateX(${pointer.tiltX}deg) rotateY(${pointer.tiltY}deg)` }}
          >
          <div className="pointer-events-none absolute left-[5%] top-[6%] h-[88%] w-[90%] rounded-[50%] border border-dashed border-slate-300/70" />
          <div className="pointer-events-none absolute left-[20%] top-[20%] h-[60%] w-[60%] rounded-[50%] border border-slate-300/80" />
          <div className="pointer-events-none absolute left-1/2 top-[3.5%] -translate-x-1/2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
            Specific components
          </div>
          {level2Categories.map((category, index) => {
            const angle = -90 + index * (360 / level2Categories.length);
            return (
              <div
                key={`spoke-${category.id}`}
                className="orbit-spoke absolute left-1/2 top-1/2 h-px origin-left bg-slate-300 transition-opacity duration-300"
                style={{ width: "27%", transform: `rotate(${angle}deg)`, opacity: activeCategory.id === category.id ? 1 : 0.35 }}
              />
            );
          })}

          <button
            type="button"
            className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-slate-950 px-5 text-center text-white shadow-2xl ring-8 ring-white/80 sm:h-44 sm:w-44"
            onClick={() => onCategorySelect(null)}
            aria-label="Clear the taxonomy category filter"
          >
            <span className="text-base font-bold leading-5 sm:text-lg">Rich labels (RL)</span>
            <span className="mt-2 text-[10px] font-medium leading-3 text-slate-300 sm:text-xs">Rich affective<br />ground truth</span>
          </button>

          {level2Categories.map((category, index) => {
            const angle = -90 + index * (360 / level2Categories.length);
            const radians = (angle * Math.PI) / 180;
            const left = 50 + 27 * Math.cos(radians);
            const top = 50 + 23 * Math.sin(radians);
            const active = activeCategory.id === category.id;
            const selected = selectedCategory?.id === category.id;
            const styles = categoryStyles[category.accent];

            return (
              <button
                key={category.id}
                type="button"
                onMouseEnter={() => setHoveredId(category.id)}
                onFocus={() => setHoveredId(category.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => onCategorySelect(category)}
                className={cx(
                  "absolute z-30 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-white px-2 text-center shadow-md transition duration-300 sm:h-28 sm:w-28",
                  active ? `scale-110 shadow-xl ${styles.active}` : "border-slate-200 opacity-75 hover:opacity-100",
                  selected && "ring-4 ring-slate-950/10"
                )}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: `translate(-50%, -50%) translate(${pointer.tiltY * (index % 2 ? 1.6 : 1)}px, ${pointer.tiltX * (index % 2 ? 1 : 1.6)}px) scale(${active ? 1.08 : 1})`
                }}
                aria-pressed={selected}
              >
                <span className={cx("mb-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold", styles.icon)}>{category.mark}</span>
                <span className="text-[11px] font-semibold leading-3 text-slate-900 sm:text-xs sm:leading-4">{category.shortTitle}</span>
              </button>
            );
          })}

          {(activeCategory.components || []).map((component, index, components) => {
            const categoryIndex = level2Categories.findIndex((category) => category.id === activeCategory.id);
            const rotation = categoryIndex * (360 / level2Categories.length);
            const angle = -90 + rotation + index * (360 / components.length);
            const radians = (angle * Math.PI) / 180;
            const left = 50 + 44 * Math.cos(radians);
            const top = 50 + 41 * Math.sin(radians);
            const componentPaperIds = getComponentPaperIds(activeCategory, component);
            const sourceSet = selectedSource ? new Set(selectedSource.papers) : null;
            const paperCount = sourceSet ? componentPaperIds.filter((id) => sourceSet.has(id)).length : componentPaperIds.length;
            const active = selectedCategory?.id === activeCategory.id && selectedComponent?.id === component.id;

            return (
              <button
                key={`${activeCategory.id}-${component.id}`}
                type="button"
                onClick={() => onComponentSelect(activeCategory, component)}
                className={cx(
                  "component-orbit-node absolute z-40 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-2 px-2 text-center shadow-lg transition hover:-translate-y-[52%] hover:shadow-xl sm:h-24 sm:w-24",
                  active ? "border-slate-950 bg-slate-950 text-white ring-4 ring-slate-950/15" : `${categoryStyles[activeCategory.accent].active} text-slate-900 hover:border-slate-400`
                )}
                style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${index * 45}ms` }}
                aria-pressed={active}
                aria-label={`${component.label}, ${paperCount} matching papers`}
              >
                <span className="text-[10px] font-semibold leading-3 sm:text-[11px] sm:leading-4">{component.label}</span>
                <span className={cx("mt-1 rounded-full px-2 py-0.5 text-[9px] font-bold", active ? "bg-white/15 text-white" : categoryStyles[activeCategory.accent].count)}>
                  {paperCount} papers
                </span>
              </button>
            );
          })}

          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 px-5 py-2 text-center text-[11px] font-medium text-slate-500 sm:hidden">
        Swipe sideways to see the complete taxonomy map.
      </div>

      <div className="border-t border-slate-200 bg-white px-5 py-5 sm:px-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Selected category</div>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">{activeCategory.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{activeCategory.summary}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <span className="w-fit rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white">
              {(activeCategory.components || []).length} specific components
            </span>
            <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
              {activeCategory.occurrenceCount} label-item occurrences
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" aria-label={`Specific components of ${activeCategory.shortTitle}`}>
          {(activeCategory.components || []).map((component, index) => {
            const componentPaperIds = getComponentPaperIds(activeCategory, component);
            const sourceSet = selectedSource ? new Set(selectedSource.papers) : null;
            const paperCount = sourceSet ? componentPaperIds.filter((id) => sourceSet.has(id)).length : componentPaperIds.length;
            const active = selectedCategory?.id === activeCategory.id && selectedComponent?.id === component.id;
            return (
            <button
              key={`${activeCategory.id}-${component.id}`}
              type="button"
              onClick={() => onComponentSelect(activeCategory, component)}
              className={cx(
                "taxonomy-component-chip flex min-h-20 items-center justify-center rounded-full border px-4 text-center text-sm font-semibold leading-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
                active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-800"
              )}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <span>{component.label}<span className={cx("ml-2 text-xs", active ? "text-slate-300" : "text-slate-500")}>{paperCount}</span></span>
            </button>
          );})}
        </div>
      </div>
    </section>
  );
}

const mlOperationalisationGroups = [
  {
    title: "Pipeline organisation",
    items: [
      ["Prompted inference, coding & tagging", 5],
      ["Generated descriptions & rationales", 6],
      ["Relational graphs & structured extraction", 7],
      ["Component-aware fusion & multitask learning", 4],
      ["Supervision transformation & representation learning", 5],
      ["Independent task-specific classifiers", 3]
    ]
  },
  {
    title: "Representation and learning role",
    items: [
      ["Language-mediated contextual or behavioural components", 7],
      ["Generated rationale or explanation targets", 3],
      ["Relational graphs, spans, pairs or tuples", 9],
      ["Distributional, contrastive, weak or distilled supervision", 5],
      ["Structured prompt fields or coding records", 3],
      ["Explicit component-state vectors or parallel targets", 3]
    ]
  },
  {
    title: "Evidence of utility or validity",
    items: [
      ["Direct rich-output evaluation", 7],
      ["Component, representation or supervision comparison", 13],
      ["Validity-oriented evaluation", 10]
    ]
  }
];

function MLOperationalisationPanel() {
  return (
    <details className="group mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 marker:hidden">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Machine-learning operationalisation</div>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-3xl font-semibold">30 / 33</span>
            <span className="text-sm text-slate-300">studies operationalised richness computationally</span>
          </div>
        </div>
        <span className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-slate-200 group-open:bg-white group-open:text-slate-950">
          View synthesis
        </span>
      </summary>
      <div className="border-t border-white/10 bg-white px-6 py-6 text-slate-950">
        <div className="grid gap-5 lg:grid-cols-3">
          {mlOperationalisationGroups.map((group) => (
            <section key={group.title} className="rounded-2xl bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-950">{group.title}</h3>
              <div className="mt-4 space-y-3">
                {group.items.map(([label, count]) => (
                  <div key={label} className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm leading-5 text-slate-600">{label}</span>
                    <span className="rounded-full bg-slate-950 px-2.5 py-1 text-xs font-semibold text-white">{count}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-5 text-xs leading-5 text-slate-500">
          Islam et al., Bi et al., and Schröder et al. remain in the taxonomy but are outside the computational synthesis.
        </p>
      </div>
    </details>
  );
}

function RichAffectiveGroundTruthMindMap() {
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [matrixType, setMatrixType] = useState(null);
  const papersToShow = getMatchingPaperIds(selectedSource, selectedCategory, selectedComponent).map(getPaper);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              {uniquePaperCount} papers {"\u00B7"} {totalCategoryCount} inclusive categories
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">Rich Affective Ground Truth</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Select a source and a richness type to browse matching papers. Click an active button again to clear it.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 text-right shadow-sm">
            <div className="text-3xl font-semibold">{papersToShow.length}</div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">current matches</div>
          </div>
        </header>

        <TaxonomyOrbit
          selectedSource={selectedSource}
          selectedCategory={selectedCategory}
          selectedComponent={selectedComponent}
          onCategorySelect={(category) => {
            if (!category) {
              setSelectedCategory(null);
              setSelectedComponent(null);
              return;
            }
            setSelectedCategory(selectedCategory?.id === category.id ? null : category);
            setSelectedComponent(null);
          }}
          onComponentSelect={(category, component) => {
            setSelectedCategory(category);
            setSelectedComponent((current) => (current?.id === component.id ? null : component));
            window.setTimeout(() => {
              document.getElementById("papers-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 80);
          }}
        />

        <MLOperationalisationPanel />

        <section className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(26rem,0.85fr)]">
          <FilterPanel
            selectedSource={selectedSource}
            selectedCategory={selectedCategory}
            onSourceSelect={(source) => setSelectedSource((current) => (current?.id === source.id ? null : source))}
            onCategorySelect={(category) => {
              setSelectedCategory((current) => (current?.id === category.id ? null : category));
              setSelectedComponent(null);
            }}
            onClear={() => {
              setSelectedSource(null);
              setSelectedCategory(null);
              setSelectedComponent(null);
            }}
            onOpenMatrix={setMatrixType}
          />
          <PapersPanel
            papersToShow={papersToShow}
            selectedSource={selectedSource}
            selectedCategory={selectedCategory}
            selectedComponent={selectedComponent}
            onClearComponent={() => setSelectedComponent(null)}
            onPaperClick={setSelectedPaper}
          />
        </section>
      </div>

      <MatrixModal type={matrixType} onClose={() => setMatrixType(null)} />
      <PaperModal paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RichAffectiveGroundTruthMindMap />);
