import React, { useState, useEffect } from 'react';
import { ChevronRight, AlertTriangle, TrendingUp, Brain, Eye, Zap, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// --- Footnotes ---
const footnotes = {
  mckinseyTasks: "McKinsey & Company, 'The economic potential of generative AI', 2023.",
  wefLoss: "World Economic Forum, 'Future of Jobs Report', 2023. Net loss: 83M jobs eliminated, 69M created by 2027 (global, all roles).",
  aiImpacts: "AI Impacts Survey, 2023. Expert survey: 10% chance of AI able to do any job by 2027.",
  metaculusAGI: "Metaculus, 2025. Median AGI forecast: ~2045.",
  aiBenchmarks: "OpenAI, Anthropic, Google DeepMind; MMLU, SuperGLUE benchmarks (2024–2025).",
  jobAutomation: "Task automation rates are percent of work activities potentially automatable by AI (not direct job loss). See McKinsey 2023, WEF 2023, OECD 2023.",
};

// --- Tooltip Component ---
const Tooltip = ({ note }: { note: string }) => (
  <div className="relative inline-flex items-center group">
    <Info className="w-3.5 h-3.5 ml-1 text-emerald-500 cursor-help" />
    <span className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gray-800 text-white text-xs rounded-lg p-2 w-60 left-4 bottom-full mb-2 z-50">
      {note}
      <div className="absolute top-full left-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
    </span>
  </div>
);

// --- Data ---
const jobCategories = {
  'Software Developer': { automation: 50, timeframe: '5–10 years', tasks: ['Code Generation', 'Testing', 'Documentation', 'Debug Analysis'] },
  'Marketing Manager': { automation: 50, timeframe: '5–10 years', tasks: ['Campaign Analysis', 'Content Creation', 'Market Research', 'Performance Tracking'] },
  'Financial Analyst': { automation: 55, timeframe: '4–8 years', tasks: ['Data Analysis', 'Report Generation', 'Forecasting', 'Risk Assessment'] },
  'Customer Service Rep': { automation: 80, timeframe: '2–6 years', tasks: ['Query Resolution', 'Order Processing', 'Follow-ups', 'Documentation'] },
  'Data Scientist': { automation: 45, timeframe: '5–10 years', tasks: ['Data Cleaning', 'Model Building', 'Visualization', 'Pattern Recognition'] },
  'Graphic Designer': { automation: 55, timeframe: '5–10 years', tasks: ['Layout Design', 'Image Editing', 'Asset Creation', 'Brand Guidelines'] },
  'Content Writer': { automation: 70, timeframe: '3–7 years', tasks: ['Article Writing', 'SEO Content', 'Research', 'Editing'] },
  'Accountant': { automation: 65, timeframe: '3–7 years', tasks: ['Bookkeeping', 'Tax Preparation', 'Auditing', 'Financial Reports'] }
};

const capabilityData = [
  { name: 'Natural Language Processing', current: 92, human: 85 },
  { name: 'Mathematical Reasoning', current: 88, human: 85 },
  { name: 'Data Analysis & Pattern Recognition', current: 88, human: 80 },
  { name: 'Visual Recognition & Processing', current: 88, human: 85 },
  { name: 'Code Generation & Programming', current: 78, human: 80 },
  { name: 'Creative Content Generation', current: 78, human: 80 },
  { name: 'Strategic Planning', current: 62, human: 85 },
  { name: 'Complex Problem Solving', current: 66, human: 90 },
  { name: 'Interpersonal Communication', current: 58, human: 90 },
  { name: 'Physical Dexterity', current: 35, human: 85 }
];

const timelineEvents = [
  {
    year: '2024',
    title: '60–70% of tasks technically automatable',
    subtitle: 'McKinsey 2023 report',
    progress: 0,
    color: 'bg-emerald-500'
  },
  {
    year: '2027',
    title: '10% chance of AI that can do any job',
    subtitle: 'AI Impacts Survey 2023',
    progress: 25,
    color: 'bg-orange-500'
  },
  {
    year: '2035',
    title: '70–85% of tasks automatable, most jobs reshaped',
    subtitle: 'Economic/AI integration pressure',
    progress: 75,
    color: 'bg-red-500'
  },
  {
    year: '2045',
    title: '50% chance of AGI (full human-level AI)',
    subtitle: 'Median expert forecast (Metaculus/AI Impacts)',
    progress: 100,
    color: 'bg-gray-700'
  }
];

const steps = ['Welcome', 'Current AI Capabilities', 'Select Your Job', 'Task Analysis', 'Timeline Projection', 'Reality Check'];

// --- Components ---
const CapabilityBar = ({ capability, index, animationPhase }: { capability: any, index: number, animationPhase: number }) => {
  const { name, current, human } = capability;
  const isActive = animationPhase >= index;
  const aiExceeds = current > human;
  
  return (
    <Card className={`transition-all duration-700 card-with-shadow ${isActive ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="font-medium">{name}</span>
            <Tooltip note={footnotes.aiBenchmarks} />
          </div>
          <div className="flex items-center gap-2">
            {aiExceeds && <TrendingUp className="w-4 h-4 text-destructive" />}
            <Badge variant={aiExceeds ? "destructive" : "outline"} className="text-xs">
              {aiExceeds ? 'AI outperforms humans' : 'Human performance leads'}
            </Badge>
          </div>
        </div>
        
        {/* AI Performance Bar */}
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">AI</span>
            <span className="text-sm">{isActive ? current : 0}%</span>
          </div>
          <Progress 
            value={isActive ? current : 0}
            className="h-3"
            accentColor={aiExceeds ? "bg-destructive" : "bg-blue-500"}
          />
        </div>
        
        {/* Human Performance Bar */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Human</span>
            <span className="text-sm">{isActive ? human : 0}%</span>
          </div>
          <Progress 
            value={isActive ? human : 0}
            className="h-3"
            accentColor="bg-gray-600"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const TaskAutomationViz = ({ job }: { job: string }) => {
  const jobData = jobCategories[job];
  const [showPercent, setShowPercent] = useState(false);
  
  useEffect(() => {
    if (job) {
      setShowPercent(false);
      const timer = setTimeout(() => setShowPercent(true), 300);
      return () => clearTimeout(timer);
    }
  }, [job]);
  
  if (!jobData) return null;

  return (
    <div className="space-y-8">
      <Card className="card-with-shadow">
        <CardContent className="p-6 text-center">
          <div className="w-full max-w-xl mx-auto mb-6">
            <div className="text-center mb-4">
              <Progress 
                value={showPercent ? jobData.automation : 0} 
                variant="circle" 
                accentColor="bg-orange-500"
                animate={true}
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 flex items-center justify-center">
              {jobData.automation}% of tasks in this job could be ALREADY automated
              <Tooltip note={footnotes.jobAutomation} />
            </h3>
            <p className="text-muted-foreground">Estimated timeframe: {jobData.timeframe}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobData.tasks.map((task, i) => (
          <Card key={i} className="border-l-4 border-red-500 card-with-shadow">
            <CardContent className="p-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <span className="font-semibold">{task}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const TimelineProjection = ({ timelineProgress }: { timelineProgress: number }) => {
  // Calculate which phase we're in based on progress percentage
  const getTimelinePhase = (progress: number) => {
    if (progress < 25) return 0;
    if (progress < 50) return 0.33;
    if (progress < 75) return 0.66;
    return 1;
  };
  
  const currentPhase = getTimelinePhase(timelineProgress);
  
  return (
    <div className="space-y-8">
      <Card className="card-with-shadow">
        <CardHeader className="text-center pb-0">
          <h2 className="text-3xl font-bold mb-2">The Acceleration Timeline</h2>
          <p className="text-muted-foreground">How AI capabilities are expected to evolve</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="relative py-12">
            {/* Background progress bar that appears behind everything */}
            <div className="absolute top-1/2 left-8 right-8 h-2 bg-secondary rounded-full transform -translate-y-1/2 shadow-inner">
              <div 
                className="h-full rounded-full transition-all duration-300 timeline-progress"
              >
                <Progress
                  value={timelineProgress}
                  className="h-full"
                  isTimeline={true}
                  animate={true}
                  currentTimelinePhase={currentPhase}
                />
              </div>
            </div>
            
            <div className="flex justify-between px-8">
              {timelineEvents.map((event) => {
                // Create a more cohesive color scheme
                const colorMap = {
                  'bg-emerald-500': 'bg-blue-500',
                  'bg-orange-500': 'bg-orange-500',
                  'bg-red-500': 'bg-destructive',
                  'bg-gray-700': 'bg-gray-800 dark:bg-gray-700'
                };
                const mappedColor = colorMap[event.color] || event.color;
                
                return (
                  <div key={event.year} className="flex flex-col items-center text-center max-w-48">
                    <div className={`w-16 h-16 rounded-full ${mappedColor} text-white font-bold text-sm flex items-center justify-center mb-4 border-4 border-white dark:border-gray-800 shadow-lg z-10 timeline-marker`}>
                      {event.year}
                    </div>
                    <Card className="card-with-shadow z-10 timeline-marker">
                      <CardContent className="p-4">
                        <h4 className="font-bold text-sm mb-1">{event.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center">
                          {event.subtitle}
                          <Tooltip note={event.year === '2024' ? footnotes.mckinseyTasks : 
                                        event.year === '2027' ? footnotes.aiImpacts :
                                        event.year === '2045' ? footnotes.metaculusAGI : ''} />
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RealityCheck = () => (
  <div className="text-center space-y-6">
    <Card className="card-with-shadow">
      <CardContent className="p-8">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">The Bottom Line</h3>
        <div className="space-y-3">
          <p className="text-lg">
            <span className="font-bold">83 million jobs eliminated</span>, <span className="font-bold">69 million created</span> globally by 2027
            <Tooltip note={footnotes.wefLoss} />
          </p>
          <p className="text-base">
            That's a net loss of <span className="font-bold">14 million roles</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            The market value of many intellectual jobs may decline—not because you can't think, but because AI can do most of the same work at lower cost.
          </p>
          <p className="text-xs text-muted-foreground italic">
            *This does not mean all affected jobs will disappear, but the human time needed will fall substantially.
          </p>
        </div>
      </CardContent>
    </Card>
    
    <Card className="card-with-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-emerald-500" />
          <span className="font-semibold">What can you do?</span>
        </div>
        <p className="text-muted-foreground text-sm">
          Understanding AI's trajectory is the first step. Consider learning about AI safety, policy, and adaptation strategies.
        </p>
      </CardContent>
    </Card>
  </div>
);

const JobImpactVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedJob, setSelectedJob] = useState('');
  const [animationPhase, setAnimationPhase] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    if (currentStep === 1) {
      const interval = setInterval(() => 
        setAnimationPhase(p => (p < capabilityData.length - 1) ? p + 1 : p), 1000
      );
      return () => clearInterval(interval);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 4) {
      const interval = setInterval(() => 
        setTimelineProgress(p => (p >= 100 ? 100 : p + 2)), 30
      );
      return () => clearInterval(interval);
    } else {
      setTimelineProgress(0);
    }
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <Eye className="w-16 h-16 mx-auto text-blue-500" />
            <h2 className="text-4xl font-bold mb-4">Could AI Take Your Job?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Let's explore how much of your work AI can already do—and what's coming next. This isn't speculation: it's based on current capabilities and expert predictions.
            </p>
            <Card className="max-w-lg mx-auto card-with-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-red-500" />
                  <span className="font-semibold">Key Finding</span>
                </div>
                <p className="text-muted-foreground text-sm flex items-center justify-center">
                  McKinsey estimates 60–70% of work tasks are already technically automatable
                  <Tooltip note={footnotes.mckinseyTasks} />
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <Card className="text-center card-with-shadow">
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold mb-2">AI vs Human Performance</h2>
                <p className="text-muted-foreground flex items-center justify-center">
                  See where AI already matches or exceeds human-level benchmarks
                  <Tooltip note={footnotes.aiBenchmarks} />
                </p>
              </CardContent>
            </Card>
            <div className="space-y-4">
              {capabilityData.map((capability, index) => (
                <CapabilityBar 
                  key={capability.name} 
                  capability={capability} 
                  index={index}
                  animationPhase={animationPhase}
                />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Card className="text-center card-with-shadow">
              <CardContent className="p-6">
                <h2 className="text-3xl font-bold mb-2">What's Your Job?</h2>
                <p className="text-muted-foreground flex items-center justify-center">
                  Select your role to see what percent of tasks are ALREADY automatable
                  <Tooltip note={footnotes.jobAutomation} />
                </p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(jobCategories).map(([job, data]) => (
                <Card
                  key={job}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedJob === job 
                      ? 'border-2 border-emerald-500 shadow-md' 
                      : 'hover:border-blue-500'
                  } card-with-shadow`}
                  onClick={() => setSelectedJob(job)}
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <span className="font-semibold">{job}</span>
                    <Badge variant="outline" className={`text-xs border-red-500 text-red-500`}>
                      {data.automation}% automatable
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 3:
        return selectedJob ? <TaskAutomationViz job={selectedJob} /> : null;
      case 4:
        return <TimelineProjection timelineProgress={timelineProgress} />;
      case 5:
        return <RealityCheck />;
      default:
        return null;
    }
  };

  const canProceed = () => (currentStep === 2 ? selectedJob !== '' : true);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <Card className="mb-8 card-with-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold">AI Job Impact Assessment</h1>
              <Badge variant="outline" className="text-sm border-2">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-4 h-3" animate={true} />
            <div className="flex justify-between text-sm">
              {steps.map((step, index) => (
                <span
                  key={step}
                  className={`transition-colors ${
                    index <= currentStep 
                      ? 'text-gray-800 dark:text-gray-100 font-semibold' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="mb-8 min-h-96">
          <div className="animate-fade-in">
            {renderStep()}
          </div>
        </div>

        {/* Navigation */}
        <Card className="card-with-shadow">
          <CardContent className="p-6 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(cs => Math.max(0, cs - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 disabled:opacity-50"
            >
              ← Previous
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(cs => cs + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 disabled:opacity-50"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Learn more about AI safety and your future</p>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => window.open('https://bluedot.org/', '_blank')}
                >
                  Explore BlueDot Courses <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobImpactVisualizer;
