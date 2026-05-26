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

const level2Categories = [
  {
    id: "granularity",
    title: "Richness in Affective-state Granularity",
    shortTitle: "Granularity",
    mark: "G",
    accent: "amber",
    summary: "Richness comes from making the affective state representation more fine-grained, multidimensional, multiple, intense, probabilistic, or temporally specified.",
    anchors: "Schroder et al. (2007); Williams et al. (2019)",
    bullets: ["intensity or dimensional affect", "compound or multi-label emotion", "soft or distributional labels", "engagement or empathy sub-dimensions", "temporal affect trajectory"],
    papers: ["p02", "p03", "p08", "p13", "p17", "p19", "p32", "p41", "p16", "p22", "p34", "p35", "p40", "p14", "p30", "p10", "p15", "p21", "p23", "p12", "p33", "p29", "p09", "p18", "p26", "p20", "p11", "p28", "p44", "p27", "p04", "p01", "p38", "p43", "p36", "p05", "p37"]
  },
  {
    id: "causal",
    title: "Causal-attribution Richness",
    shortTitle: "Causal attribution",
    mark: "C",
    accent: "emerald",
    summary: "Richness comes from linking an emotion to its cause, trigger, causal span, cause utterance, or turning-point cause.",
    anchors: "Poria et al. / RECCON; Wang et al. (2023); Ho et al. (2024)",
    bullets: ["emotion-cause pair", "cause utterance or span", "emotion change or flip", "turning points and pre/post change", "appraisal antecedents or stimulus"],
    papers: ["p02", "p03", "p22", "p35", "p14", "p10", "p15", "p21", "p23", "p09", "p18", "p20", "p01"]
  },
  {
    id: "descriptive",
    title: "Explanation-oriented Richness",
    shortTitle: "Explanation",
    mark: "E",
    accent: "rose",
    summary: "Richness comes from adding natural-language explanations, evidence-grounded reasoning, or multimodal cues that justify why an affective label was assigned.",
    anchors: "Ke et al. (2021); Zhang et al. (2025); Cheng et al. (2024)",
    bullets: ["self-report descriptions", "caption or narrative explanation", "typed annotator rationale", "expert or clinical rationale", "evidence-grounded natural-language explanation"],
    papers: ["p03", "p06", "p07", "p08", "p13", "p17", "p19", "p32", "p41", "p22", "p40", "p14", "p12", "p33", "p18", "p11", "p44"]
  },
  {
    id: "contextual",
    title: "Situational-context Richness",
    shortTitle: "Context",
    mark: "S",
    accent: "sky",
    summary: "Richness comes from representing the person, social/communicative setting, interaction, environment, and broader situation in which affect is perceived.",
    anchors: "Schroder et al. (2007); Yang et al. (2023); Etesam et al. (2024)",
    bullets: ["dialogue history", "task or scenario context", "coping or behaviour situation", "response planning and interactional sequence", "character, role, or action context"],
    papers: ["p02", "p03", "p06", "p07", "p17", "p16", "p22", "p34", "p35", "p40", "p14", "p30", "p12", "p29", "p18", "p26", "p11", "p28", "p27", "p01", "p43"]
  },
  {
    id: "representation",
    title: "Model-/schema-level Representation Richness",
    shortTitle: "Representation",
    mark: "R",
    accent: "violet",
    summary: "Richness comes from formalising affective information through structured schemas, descriptors, embeddings, AU structures, scene graphs, or other machine-readable representations.",
    anchors: "Schroder et al. (2007); EmotionML/W3C; Yan et al. (2020); Wu et al. (2024)",
    bullets: [
      "formal markup or schema slots",
      "class-level label descriptions (label name + category definition)",
      "CLIP text prompt / label embedding",
      "scene graph or AU structure",
      "model-generated contextual representations (context layer, not necessarily rationale)"
    ],
    papers: ["p07", "p41", "p20", "p44", "p27", "p04", "p36", "p37"]
  }
];

const sourceFilters = [
  {
    id: "annotated",
    title: "Human annotated",
    mark: "H",
    papers: [
      "p02",
      "p01",
      "p03",
      "p38",
      "p04",
      "p05",
      "p21",
      "p09",
      "p10",
      "p28",
      "p30",
      "p32",
      "p11",
      "p12",
      "p29",
      "p43",
      "p23",
      "p34",
      "p15",
      "p17",
      "p18"
    ]
  },
  {
    id: "generated",
    title: "Algorithm generated",
    mark: "A",
    papers: ["p33", "p16"]
  },
  {
    id: "hybrid",
    title: "Hybrid",
    mark: "M",
    papers: ["p36", "p37", "p20", "p06", "p22", "p07", "p08", "p40", "p26", "p27", "p41", "p35", "p13", "p14", "p44", "p19"]
  }
];

const activePaperIds = Array.from(new Set(sourceFilters.flatMap((source) => source.papers)));

const paperEnrichment = {
  p01: [
    "1. Core emotion description (categories, appraisal scale, dimensional scales, emotion related states)",
    "2. Complex emotion(multiple emotions, change of emotions, intensity, temporal aspect)",
    "3. meta information(confidence, probability, degree of acting)",
    "4. external context (trigger, cause, target)",
    "5. global metadata (personal info, culture, gender, personality, social and communicative context, envrionment)"
  ],
  p02: [
    "1. Annotate the emotion labels from the view of speaker.",
    "2. Give intensity/degree to emotion in rank of 3",
    "3. Include analysis of cause and effect in a sentence",
    "4. Include analysis of conditional sentence",
    "5. Including Sub class(fine-grained) for an emotion",
    "6. Allow multiple emotion tags for a sentence"
  ],
  p03: [
    "1.pain, exertion, desire to stop (runner) with ascending numerical values between 1 and 5",
    "2. pain, worries, confidence (chronic pain) with ascending numerical values between 1 and 10",
    "3. emotional valence: negative, neutral, positive",
    "4. think aloud description between prompt can refine ratings",
    "5. In Discussion: think aloud description allows self-reflection, which reduce the randomness of groundtruth",
    "6. In Discussion: provide additional linguistic cues (e.g., pain location, cause, emotional reaction to pain, etc) as multiple labels"
  ],
  p04: ["1. emotion labels", "2. AU annotations"],
  p05: ["1. individual rater labels", "2. global consensus label"],
  p06: [
    "1.contextual information such as their social interactions, social relationships with others in the image input into an open text box",
    "2. their environmental setting input into an open text box",
    "3. divided the physical signals into multiple categories based on body parts by GPT, and annotators could use checkboxes to select relevant descriptions.",
    "4. tag the person within a bounding box with various attributes, including their perceived age group, perceived sex, and social identity or occupation",
    "5. the annotation interface generated an appropriate image caption based on all the chosen tags"
  ],
  p07: [
    "1. Bounding box",
    "2. Gender/age information",
    "3. 848 action types from existing datasets",
    "4. 850+ social signals from 'writer's guide'",
    "5. scene locations from 335 rural and urban environment descriptors",
    "6. Information above put into CLIP and generate descriptive caption",
    "7. Caption generated by LLaVa"
  ],
  p08: ["1. ChatGPT to adjust original soft label distributions", "2. Human typed descriptions", "3. Rater distributions"],
  p09: ["1. 7 emotions", "2. Instigator label to explain an emotion flip", "3. trigger label"],
  p10: [
    "1. emotion-cause pair e.g. (emotion utterance, cause utterance)",
    "2. cause type",
    "3. textual cause span",
    "4. 6 emotion category"
  ],
  p11: [
    "1. Each motion sequence includes the performer's self-reported intended emotion.",
    "2. emotion perception distribution from 22 viewer",
    "3. contextual scenario in which the motion occurred",
    "4. The model generates short textual interpretations.",
    "5. descriptions of human motions"
  ],
  p12: ["1. 11 emotion labels", "2. 32 compound emotion labels", "3. emotional descriptive text", "4. confidence", "5. gender"],
  p13: [
    "1. select emotional peak frame",
    "2. MiniGPT-v2 describes visual context / activity / environment",
    "3. Qwen-Audio generates audio tone descriptions from speech",
    "4. Lexical subtitles provide spoken-text context"
  ],
  p14: [
    "1. Indicates the point in time when the turning point change occurred",
    "2. cause for marking the turning point",
    "3. feelings, behaviors, decisions, perspectives before and after turning point",
    "4. evidence annotation of turning point",
    "5. relevant visual description of the scenes (frames) in the conversations",
    "6. Common discrete emotion categories extracted from the circumplex model"
  ],
  p15: [
    "1. 6 emotion category",
    "2. textual cause span",
    "3. multimodal cause utterance",
    "4. emotion casual pair (emotion utterance + emotion category + textual cause span)"
  ],
  p16: [
    "1. 7 primary emotions, 40 secondary emotions, and 81 tertiary emotions",
    "2. This incorporates the character backstory and plot context from the musical theatre script. It includes: character, text/lyrics, global persona, scene context, and visual description."
  ],
  p17: [
    "1. SAM for valence, arousal, dominance",
    "2. PANAS for positive and negative affect",
    "3. liking and familiarity ratings",
    "4. participants describe: what major emotion they felt, whether they felt mixed emotions, why they felt those emotions in interview",
    "5. Transcripts of interview recording are manually cleaned to extract each participant’s response to each stimulus"
  ],
  p18: [
    "1. autobiographical review text",
    "2. 7 emotion label",
    "3. emotion intensity ratings",
    "4. 20 cognitive appraisal dimensions",
    "5. appraisal-eliciting text responses/answer from prompt",
    "6. consumer-behaviour",
    "7. individual traits"
  ],
  p19: [
    "1. Emotion label",
    "2. Interpretive Reasoning",
    "3. Evidence-Grounded Reasoning",
    "5. Semantic + paralinguistic framing: what is said and how it is said"
  ],
  p20: [
    "1. emotion label",
    "2. emotion-cause relation label",
    "3. conversation as a heterogeneous conversation graph",
    "4. graph includes: conversation node, utterance node, target classification node, cause classification node"
  ],
  p21: [
    "1. Ekman's six basic emotions and neutral",
    "2. individual cause span",
    "3. aggregated cause: takes the form of multiple cause spans that together form a complete cause."
  ],
  p22: [
    "1. Generate natural language descriptions using VLLM.",
    "2. descriptions include target person's emotions and their surrounding environment",
    "3. visual/contextual cues, such as: facial expression, body pose, interaction, environment",
    "4. causes supporting these emotions",
    "5. BoLD, EMOTIC, and CAER-S all have emotion annotations provided manually or from the original dataset."
  ],
  p23: ["1. emotion category", "2. emotion utterance", "3. cause utterance", "4. cause type", "5. cause's modality cue"],
  p26: [
    "1. 28 emotion labels",
    "2. multi-perspective commonsense knowledge: speaker intent, speaker reaction,effect on speaker, effect on others, reaction of others"
  ],
  p27: [
    "1. emotion labels",
    "2. People in the image + background environment information",
    "3. Object labels and object-object relations in the image",
    "4. face/body pose feature in the character area",
    "5. Representing images as structured semantic relationships: nodes are objects, edges are relationships/predicates"
  ],
  p28: ["1. danmu: contextual viewer-response from video", "2. 5 affective labels: VA, Primary emotion, Valence comparison, Arousal comparison"],
  p29: [
    "1. 14 emotions",
    "2. personality information",
    "3. speaker and non-speaker view",
    "4. intra-personal emotion context",
    "5. inter-personal emotion propagation"
  ],
  p30: ["1. 32 body language", "2. 24 emotion", "3. 24 psychiatric symptoms", "4. split body to upper and lower part"],
  p32: [
    "1. marked sentences that evidenced or contradicted any of the nine DSM-5 depression symptoms",
    "2. annotator added a concise clinical rationale",
    "3. The tags are not just for the entire Reddit post, but are sentence-level annotations."
  ],
  p33: [
    "1. 28 multi-label emotion labels",
    "2. expressiveness scores(soft label)",
    "3. Contextual descriptions generated around a specific actor/character"
  ],
  p34: ["1. Traditional emotion labels", "2. Coping strategy: How do people act or respond when faced with an emotionally eliciting event?"],
  p35: [
    "1. A emotion label",
    "2. PAD emotion states, Pleasure, Arousal, Dominance",
    "3. 18 types of parental behaviors: positive, neutral, negative",
    "4. the causal chain and dynamic relationships in the interaction process: what triggers the conflict, how parents respond, how children react, and how the conflict unfolds"
  ],
  p36: [
    "1. Arousal, Valence, Dominance,Liking",
    "2. The canonical output variates learned by CCA, i.e., redundant representations of the label."
  ],
  p37: [
    "1. multi-label emotion labels",
    "2. emotion category is represented as a one-hot vector",
    "3. Map each emotion category to a Valence-Arousal (VA) space.",
    "4. VA similarity represent emotion-emotion correlation"
  ],
  p38: ["1. emotion labels", "2. intensity", "3. sentiment label"],
  p40: [
    "1. Use EMOTIC's 26 emotion categories and require the model to output a list of emotion labels.",
    "2. Generate a narrative caption with semantic structure",
    "3. narrative caption including cue-level richness: age/gender, action, environment, physical/social signals, includes age/gender categories, 848 action classes, 224 environment descriptors, and 889 physical/social signals."
  ],
  p41: [
    "1. discrete label",
    "2. natural-language explanation / rationale",
    "3. semantic parser exchanges NL explanations into a series of logical forms that represent labelling functions",
    "4. The remaining labelling functions are adopted for unlabelled instances to generate a matrix of labels"
  ],
  p43: ["1. self-report labels", "2. third-party annotation labels", "3. empathy, distress, personality"],
  p44: [
    "1. 32 emotion labels",
    "2. emotion label description",
    "3. utterance instance",
    "4. encode utterance and emotion label into a unified embedding space",
    "5. triple view: instance-label view, instance-instance view, label-label view"
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
    exactlyEnriched: paperEnrichment[id] || []
  };
}

function getMatchingPaperIds(selectedSource, selectedCategory) {
  const baseIds = selectedCategory ? selectedCategory.papers : allPaperIds;

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
        <span className="text-base font-semibold">{source.title}</span>
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

function FilterPanel({ selectedSource, selectedCategory, onSourceSelect, onCategorySelect, onClear }) {
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
      <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
              <p className="mt-1 text-sm leading-6 text-slate-600">{selectedCategory.summary}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Anchors: {selectedCategory.anchors}</p>
            </div>
          </div>
          <ul className="mt-3 grid gap-2 pl-5 text-sm text-slate-700 sm:grid-cols-2">
            {selectedCategory.bullets.map((bullet) => (
              <li key={bullet} className="list-disc">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function PapersPanel({ papersToShow, selectedSource, selectedCategory, onPaperClick }) {
  const styles = selectedCategory ? categoryStyles[selectedCategory.accent] : null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {selectedSource ? selectedSource.title : "All sources"}
          </span>
          <span className={cx("rounded-full px-3 py-1 text-xs font-semibold", styles ? styles.count : "bg-slate-100 text-slate-600")}>
            {selectedCategory ? selectedCategory.title : "All richness types"}
          </span>
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
          <InfoBlock label="What it does" text={paper.summary} />
          <InfoBlock label="Richness mechanism" text={paper.richness} />
          <InfoBlock label="Use in thesis" text={paper.use} />
          <InfoBlock label="Gap / limitation" text={paper.caution} />
        </div>
      </div>
    </div>
  );
}

function EnrichmentBlock({ items }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-sm font-semibold text-slate-950">What is exactly enriched</div>
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
              Level 2 now uses five inclusive classes from the latest taxonomy. If a paper has any cue under a class, it appears there.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {level2Categories.map((category) => {
              const styles = categoryStyles[category.accent];
              return (
                <div key={category.id} className={cx("rounded-2xl border p-4", styles.active)}>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <span>{category.mark}</span>
                    <span>{category.title}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5 pl-5 text-sm text-slate-700">
                    {category.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function RichAffectiveGroundTruthMindMap() {
  const [selectedSource, setSelectedSource] = useState(sourceFilters[0]);
  const [selectedCategory, setSelectedCategory] = useState(level2Categories[0]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const papersToShow = getMatchingPaperIds(selectedSource, selectedCategory).map(getPaper);

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

        <section className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(26rem,0.85fr)]">
          <FilterPanel
            selectedSource={selectedSource}
            selectedCategory={selectedCategory}
            onSourceSelect={(source) => setSelectedSource((current) => (current?.id === source.id ? null : source))}
            onCategorySelect={(category) => setSelectedCategory((current) => (current?.id === category.id ? null : category))}
            onClear={() => {
              setSelectedSource(null);
              setSelectedCategory(null);
            }}
          />
          <PapersPanel
            papersToShow={papersToShow}
            selectedSource={selectedSource}
            selectedCategory={selectedCategory}
            onPaperClick={setSelectedPaper}
          />
        </section>
      </div>

      <PaperModal paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RichAffectiveGroundTruthMindMap />);
