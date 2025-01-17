import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const LifeInventoryForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});

  const questions = [
    {
      section: "時期選択",
      question: "まず、振り返りたい時期を選んでください",
      type: "select",
      options: ["小学生", "中学生", "高校生", "現在"],
      key: "period"
    },
    {
      section: "人間関係",
      question: "その時期の人間関係について、具体的なエピソードを教えてください",
      subQuestion: "そのエピソードは、あなたにどのような影響を与えましたか？",
      type: "textArea",
      key: "relationships"
    },
    {
      section: "趣味・自己成長",
      question: "その時期に打ち込んでいたことは何ですか？",
      subQuestion: "それによって得られた結果と内的な変化を教えてください",
      type: "textArea",
      key: "growth"
    },
    {
      section: "精神的な幸福",
      question: "その時期のあなたは、どのような価値観を持っていましたか？",
      subQuestion: "なぜそのような価値観を持つようになったと思いますか？",
      type: "textArea",
      key: "values"
    },
    {
      section: "Well-being分析",
      question: "以下の要素について、詳しく教えてください：",
      type: "multipart",
      parts: [
        {
          label: "没頭",
          question: "何に没頭し、なぜ没頭できましたか？",
          key: "immersion"
        },
        {
          label: "意義性",
          question: "何に意味を感じ、なぜそう感じましたか？",
          key: "meaning"
        },
        {
          label: "達成感",
          question: "どんな成長や達成を感じましたか？",
          key: "achievement"
        },
        {
          label: "仲間",
          question: "どんな関係性があり、何を共有できましたか？",
          key: "companions"
        },
        {
          label: "欲求の解消",
          question: "どんな欲求があり、どう満たされましたか？",
          key: "desires"
        }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResponse = (key, value) => {
    setResponses({
      ...responses,
      [key]: value
    });
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case "select":
        return (
          <div className="space-y-4">
            <select 
              className="w-full p-2 border rounded"
              onChange={(e) => handleResponse(question.key, e.target.value)}
              value={responses[question.key] || ""}
            >
              <option value="">選択してください</option>
              {question.options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        );
      case "textArea":
        return (
          <div className="space-y-4">
            <textarea
              className="w-full p-2 border rounded h-32"
              placeholder="ここに記入してください..."
              onChange={(e) => handleResponse(question.key, e.target.value)}
              value={responses[question.key] || ""}
            />
            {question.subQuestion && (
              <textarea
                className="w-full p-2 border rounded h-32 mt-4"
                placeholder={question.subQuestion}
                onChange={(e) => handleResponse(`${question.key}_sub`, e.target.value)}
                value={responses[`${question.key}_sub`] || ""}
              />
            )}
          </div>
        );
      case "multipart":
        return (
          <div className="space-y-6">
            {question.parts.map((part, i) => (
              <div key={i} className="space-y-2">
                <h3 className="font-semibold text-lg">{part.label}</h3>
                <textarea
                  className="w-full p-2 border rounded h-24"
                  placeholder={part.question}
                  onChange={(e) => handleResponse(part.key, e.target.value)}
                  value={responses[part.key] || ""}
                />
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>人生の棚卸し - {questions[currentStep].section}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg mb-4">{questions[currentStep].question}</div>
        {renderQuestion(questions[currentStep])}
        <div className="flex justify-between mt-6">
          <button 
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            前へ
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleNext}
            disabled={currentStep === questions.length - 1}
          >
            次へ
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LifeInventoryForm;
