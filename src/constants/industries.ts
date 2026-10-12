export interface IndustryFeature {
  title: string;
  description: string;
}

export interface IndustryUseCase {
  title: string;
  description: string;
  image: string;
}

export interface Industry {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  featuresTitle: string;
  features: IndustryFeature[];
  useCases: IndustryUseCase[];
  ctaTitle: string;
  ctaSubtitle: string;
}

// Shared features for all industries (the white section)
export const SHARED_FEATURES: IndustryFeature[] = [
  {
    title: "Real-Time Data Mastery",
    description:
      "Fusion AI's Edge platform processes and analyzes on-site data streams instantaneously, delivering actionable insights exactly where they're needed to drive smarter, faster decisions.",
  },
  {
    title: "Connectivity, Redefined",
    description:
      "Through our partnerships with Starlink, enjoy seamless high-speed connectivity even in the most remote locations, ensuring uninterrupted operations and reliable data flow.",
  },
  {
    title: "AI-Driven Operations",
    description:
      "We embed advanced AI and ML algorithms to predict maintenance needs, optimize drilling and production, and minimize downtime while maximizing performance.",
  },
  {
    title: "Sustainability, Core to Our Mission",
    description:
      "Fusion AI is committed to environmental stewardship, providing tools to monitor carbon footprint, ensure regulatory compliance, and optimize energy use for more sustainable practices.",
  },
  {
    title: "Safety, The Foundation of Innovation",
    description:
      "Our technology prioritizes asset and personnel safety with real-time monitoring, predictive diagnostics, and tailored compliance management to create a safer work environment.",
  },
  {
    title: "Tailored for the Energy Pioneer",
    description:
      "Fusion AI solutions are fully customizable to meet the unique challenges of energy leaders, blending cutting-edge technology and industry expertise to propel you toward a more efficient future.",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    heroTitle: "Fusion AI for Oil & Gas",
    heroSubtitle: "Pioneering at the Edge of Innovation",
    heroDescription:
      "Automation is the new electricity. With Fusion AI, you harness the intelligence of modern workflows, bringing data, tools, and decisions together in one unified flow — all powered by AI.",
    heroImage: "/industries/oilandGas/card0.png",
    featuresTitle: "Unleashing the Power of Edge Computing in Oil &Gas",
    features: SHARED_FEATURES,
    useCases: [
      {
        title: "Pioneer the Future of Drilling: Smarter, Faster, Greener",
        description:
          "Unlock next-generation drilling performance with Fusion AI's adaptive insights, which continuously respond to changing conditions, boost penetration rates, and shrink your environmental footprint—drill deeper, quicker, and cleaner.",
        image: "/industries/oilandGas/card1.png",
      },
      {
        title: "Maximize Drilling Efficiency with Real-Time Trajectory Adjustments",
        description:
          "Fusion AI AI's intelligent control loops analyze tool face and formation feedback on the fly, instantly adjusting drill paths to avoid costly sidetracks and optimize borehole quality—keeping your project on schedule and under budget.",
        image: "/industries/oilandGas/card2.png",
      },
      {
        title: "Harness the Power of AI to Predict and Prevent Remote Asset Failures",
        description:
          "By fusing sensor telemetry with machine-learning prognostics, Fusion AI AI identifies emerging wear patterns and issues before they escalate, triggering automated work orders and minimizing downtime across your remote installations.",
        image: "/industries/oilandGas/card3.png",
      },
      {
        title: "Strengthen Stakeholder Confidence by Setting All-New Eco-Standards",
        description:
          "Leverage Fusion AI AI's continuous emissions tracking and automated compliance alerts to demonstrate transparent stewardship, meet evolving regulations, and showcase your commitment to sustainable operations throughout the asset lifecycle.",
        image: "/industries/oilandGas/card4.png",
      },
    ],
    ctaTitle: "Ready to Automate Your Work?",
    ctaSubtitle: "Sign up now and start saving time today.",
  },
  {
    slug: "mining",
    name: "Mining",
    heroTitle: "Fusion AI for Mining",
    heroSubtitle: "Automation is the New Electricity with Fusion AI",
    heroDescription:
      "Fusion AI empowers mining operations with real-time fleet coordination that maximizes haulage efficiency and reduces fuel costs. Its predictive maintenance models analyze sensor data to forecast equipment failures, cutting unplanned downtime and extending asset lifespans. Advanced planning algorithms optimize resource allocation and extraction sequencing, driving higher ore recovery rates. Built-in environmental monitoring ensures compliance with sustainability standards, fostering community trust and reducing ecological impact.",
    heroImage: "/industries/mining/card0.png",
    featuresTitle: "Unleashing the Power of Edge Computing in Mining",
    features: SHARED_FEATURES,
    useCases: [
      {
        title: "Transform Mining Operations: Smarter, Safer, Sustainable",
        description:
          "Fusion AI's advanced models dynamically schedule and route autonomous vehicles and equipment, reducing idle time, minimizing fuel consumption, and maximizing material throughput.",
        image: "/industries/mining/card1.png",
      },
      {
        title: "Boost Extraction Efficiency with Real-Time Fleet Coordination",
        description:
          "Fusion AI's advanced models dynamically schedule and route autonomous vehicles and equipment, reducing idle time, minimizing fuel consumption, and maximizing material throughput.",
        image: "/industries/mining/card2.png",
      },
      {
        title: "Leverage AI to Forecast and Prevent Equipment Failures",
        description:
          "By analyzing sensor data and operational patterns, Fusion AI predicts component wear and imminent breakdowns—enabling proactive maintenance that cuts downtime and extends machine life.",
        image: "/industries/mining/card3.png",
      },
      {
        title: "Build Trust by Upholding New Eco Standards",
        description:
          "Fusion AI's edge-deployed monitoring ensures air quality, water usage, and emissions stay within environmental regulations—helping mining companies achieve compliance and community trust.",
        image: "/industries/mining/card4.png",
      },
    ],
    ctaTitle: "Ready to Automate Your Work?",
    ctaSubtitle: "Sign up now and start saving time today.",
  },
  {
    slug: "education",
    name: "Education",
    heroTitle: "Fusion AI for Education",
    heroSubtitle: "Fusion AI tailors learning pathways by dynamic adjustment to each student",
    heroDescription:
      "Fusion AI tailors learning pathways by dynamically adapting content to each student's strengths and challenges, boosting engagement and comprehension. It delivers real-time analytics to instructors, enabling on-the-fly adjustments in pacing, support, and instructional strategies for optimal outcomes. By forecasting at-risk learners through behavioral data, it triggers proactive interventions that reduce dropout rates and improve retention. Continuous, automated quality assessments ensure curricula and teaching practices meet accreditation standards and evolve with emerging educational needs.",
    heroImage: "/industries/education/card0.png",
    featuresTitle: "Unleashing the Power of Edge Computing in Education",
    features: SHARED_FEATURES,
    useCases: [
      {
        title: "Transform Learning Experiences: Engaging, Adaptive, Scalable",
        description:
          "Discover how Fusion AI personalizes educational content and delivery, creating interactive and adaptive lessons that meet each learner's needs, boost engagement, and drive academic success.",
        image: "/industries/education/card1.png",
      },
      {
        title: "Enhance Classroom Outcomes with Instant Teaching Insights",
        description:
          "Fusion AI analyzes student interactions and performance in real-time, empowering instructors to adjust pacing, content difficulty, and support strategies on the fly for optimal learning outcomes.",
        image: "/industries/education/card2.png",
      },
      {
        title: "Empower Predictive Support to Identify At-Risk Students",
        description:
          "By leveraging student data and behavioral patterns, Fusion AI forecasts potential dropouts and learning gaps—enabling proactive interventions that keep students on track and motivated.",
        image: "/industries/education/card3.png",
      },
      {
        title: "Elevate Educational Standards through Continuous Quality Monitoring",
        description:
          "Fusion AI's automated evaluation tools track curriculum effectiveness, accreditation metrics, and compliance benchmarks—ensuring institutions deliver top-tier education and meet regulatory requirements.",
        image: "/industries/education/card4.png",
      },
    ],
    ctaTitle: "Ready to Automate Your Work?",
    ctaSubtitle: "Sign up now and start saving time today.",
  },
  {
    slug: "automotive",
    name: "Automotive",
    heroTitle: "Fusion AI for Automotive",
    heroSubtitle: "Fusion AI streamlines development by providing data-driven insights",
    heroDescription:
      "Fusion AI streamlines vehicle development by providing data-driven design insights that shorten time-to-market and enhance safety features. Its real-time production monitoring fine-tunes assembly processes, boosting throughput and reducing waste. Predictive maintenance analytics forecast component failures to minimize downtime and extend fleet longevity. Built-in environmental monitoring helps manufacturers meet stringent emissions targets and reinforce their sustainability credentials.",
    heroImage: "/industries/automotive/card0.png",
    featuresTitle: "Unleashing the Power of Edge Computing in Automotive",
    features: SHARED_FEATURES,
    useCases: [
      {
        title: "Drive the Future of Automotive: Smarter, Faster, Connected",
        description:
          "Experience the next generation of vehicle development with Fusion AI, where data-driven insights optimize every design choice, accelerate time-to-market, and seamlessly connect cars to the cloud - all while enhancing passenger safety and comfort.",
        image: "/industries/automotive/card1.png",
      },
      {
        title: "Optimize Production Efficiency with Real-Time Process Adjustments",
        description:
          "Fusion AI's models continuously monitor manufacturing lines, automatically fine-tuning robot parameters and material feeds in real-time to boost throughput, reduce scrap rates, and ensure consistent build quality.",
        image: "/industries/automotive/card2.png",
      },
      {
        title: "Empower AI to Predict and Prevent Vehicle Maintenance Issues",
        description:
          "Leveraging IoT sensors and advanced analytics, Fusion AI forecasts component wear - scheduling proactive service before breakdowns occur, minimizing unplanned downtime for fleets and extending vehicle lifecycles.",
        image: "/industries/automotive/card3.png",
      },
      {
        title: "Elevate Brand Trust by Setting All-New Eco-Standards",
        description:
          "Fusion AI's edge-deployed environmental monitoring ensures that every vehicle meets the strictest emissions and energy-efficiency targets—helping OEMs comply with regulations and exceed customer expectations for sustainability.",
        image: "/industries/automotive/card4.png",
      },
    ],
    ctaTitle: "Ready to Automate Your Work?",
    ctaSubtitle: "Sign up now and start saving time today.",
  },
  {
    slug: "defense-security",
    name: "Defense & Security",
    heroTitle: "Fusion AI for Defense & Security",
    heroSubtitle: "Fusion AI delivers real-time threat intelligence by analyzing multiple sources",
    heroDescription:
      "Fusion optimizes mission planning through dynamic geospatial and logistics insights, ensuring rapid, data-driven deployment decisions. Predictive maintenance and automated audit trails further enhance asset readiness, regulatory compliance, and operational accountability.",
    heroImage: "/industries/defenseandsecurity/card0.png",
    featuresTitle: "Unleashing the Power of Edge Computing in Defense & Security",
    features: SHARED_FEATURES,
    useCases: [
      {
        title: "Fortify Defense Posture with AI-Powered Threat Intelligence",
        description:
          "Fusion AI ingests multi-source intelligence feeds and sensor data to detect anomalies and emerging threats - empowering security teams to preempt attacks and safeguard critical assets.",
        image: "/industries/defenseandsecurity/card1.png",
      },
      {
        title: "Streamline Mission Planning with Real-Time Operational Insights",
        description:
          "By consolidating geospatial, logistics, and troop-status information, Fusion AI provides dynamic recommendations for resource allocation and deployment, ensuring mission success under evolving conditions.",
        image: "/industries/defenseandsecurity/card2.png",
      },
      {
        title: "Enhance Asset Readiness with Predictive Maintenance Algorithms",
        description:
          "Leveraging equipment telemetry and maintenance history, Fusion AI anticipates system failures - scheduling timely inspections and repairs to maximize operational availability and reduce lifecycle costs.",
        image: "/industries/defenseandsecurity/card3.png",
      },
      {
        title: "Guarantee Compliance and Auditability via Automated Reporting",
        description:
          "Fusion AI generates secure, timestamped logs of all activities and data exchanges - simplifying after action reviews, regulatory compliance, and transparent information sharing among stakeholders.",
        image: "/industries/defenseandsecurity/card4.png",
      },
    ],
    ctaTitle: "Ready to Automate Your Work?",
    ctaSubtitle: "Sign up now and start saving time today.",
  },
  {
    slug: "supply-chain",
    name: "Supply Chain",
    heroTitle: "Fusion AI for Supply Chain",
    heroSubtitle: "Fusion AI delivers unified, real-time visibility across suppliers",
    heroDescription:
      "Fusion AI delivers unified, real-time visibility across the supply chain, from suppliers to carriers and warehouses, empowering teams to proactively manage inventory and prevent supply chain disruptions. It leverages predictive slotting and demand forecasting to optimize warehouse workflows and maintain ideal stock levels. Automated compliance audits streamline regulatory checks and documentation—minimizing delays and avoiding penalties.",
    heroImage: "/industries/supplychain/card0.png",
    featuresTitle: "Unleashing the Power of Edge Computing in Supply Chain",
    features: SHARED_FEATURES,
    useCases: [
      {
        title: "Orchestrate End-to-End Visibility with Intelligent Tracking",
        description:
          "Fusion AI aggregates data from suppliers, carriers, and warehouses to provide a unified, real-time view of inventory and shipments—enabling proactive decision-making and minimizing stockouts.",
        image: "/industries/supplychain/card1.png",
      },
      {
        title: "Optimize Warehouse Operations with Predictive Slotting",
        description:
          "By analyzing order patterns and demand forecasts, Fusion AI recommends optimal slotting and resource allocation—streamlining picking routes and reducing handling times in high-throughput facilities.",
        image: "/industries/supplychain/card2.png",
      },
      {
        title: "Forecast Demand Fluctuations to Balance Inventory",
        description:
          "Leveraging historical sales data and market indicators, Fusion AI produces accurate demand forecasts—helping businesses maintain optimal stock levels and reduce carrying costs.",
        image: "/industries/supplychain/card3.png",
      },
      {
        title: "Ensure Regulatory Compliance with Automated Audits",
        description:
          "Fusion AI continuously monitors shipping regulations, trade agreements, and customs requirements—automating compliance checks and documentation to prevent costly delays and penalties.",
        image: "/industries/supplychain/card4.png",
      },
    ],
    ctaTitle: "Ready to Automate Your Work?",
    ctaSubtitle: "Sign up now and start saving time today.",
  },
  {
    slug: "mobility",
    name: "Mobility",
    heroTitle: "Fusion AI for Mobility",
    heroSubtitle: "Fusion AI for mobility integrates real-time data from transports, traffic, etc.",
    heroDescription:
      "Fusion AI for Mobility integrates real-time data from buses, trains, ride-hailing, and micromobility to deliver seamless, end-to-end travel experiences that reduce transfers and boost accessibility. Its demand-driven algorithms optimize EV charging infrastructure placement and scaling, ensuring reliable network coverage. Meanwhile, adaptive traffic analytics and dynamic signal control alleviate congestion, and personalized service insights enhance passenger satisfaction and loyalty.",
    heroImage: "/industries/mobility/card0.png",
    featuresTitle: "Unleashing the Power of Edge Computing in Mobility",
    features: SHARED_FEATURES,
    useCases: [
      {
        title: "Enable Seamless Multimodal Integration: Connected, Efficient, Flexible",
        description:
          "Fusion AI orchestrates data across buses, trains, ride-hailing, and micro-mobility to deliver unified travel experiences—optimizing routes and transfers for improved accessibility and reduced travel time.",
        image: "/industries/mobility/card1.png",
      },
      {
        title: "Accelerate EV Infrastructure Deployment with Dynamic Demand Modeling",
        description:
          "By analyzing travel patterns, demographic data, and grid capacity, Fusion AI pinpoints optimal locations and scaling requirements for charging stations—ensuring efficient rollout and user convenience.",
        image: "/industries/mobility/card2.png",
      },
      {
        title: "Empower Real-Time Traffic Management for Congestion Relief",
        description:
          "Fusion AI ingests live traffic sensor and GPS data to predict congestion hotspots and adjust signal timings or reroute flows—minimizing delays and improving urban mobility.",
        image: "/industries/mobility/card3.png",
      },
      {
        title: "Elevate Passenger Experience through Predictive Service Personalization",
        description:
          "Leveraging traveler preferences and historical usage data, Fusion AI recommends tailored schedules, seating, and promotions—boosting satisfaction and loyalty across transit networks.",
        image: "/industries/mobility/card4.png",
      },
    ],
    ctaTitle: "Ready to Automate Your Work?",
    ctaSubtitle: "Sign up now and start saving time today.",
  },
];

export const getIndustryBySlug = (slug: string): Industry | undefined => {
  return INDUSTRIES.find((industry) => industry.slug === slug);
};
