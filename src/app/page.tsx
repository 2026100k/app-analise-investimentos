'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Brain,
  Target,
  BarChart3,
  Sparkles,
  ChevronRight,
  Award,
  Users,
  Lock
} from 'lucide-react';

type QuizStep = 'landing' | 'quiz' | 'result' | 'checkout';
type BillingPeriod = 'monthly' | 'annual';

interface QuizAnswer {
  question: string;
  answer: string;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<QuizStep>('landing');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  const quizQuestions = [
    {
      question: 'Qual é o seu nível de experiência com investimentos?',
      options: [
        'Iniciante - Nunca investi antes',
        'Intermediário - Já investi algumas vezes',
        'Avançado - Invisto regularmente',
        'Expert - Sou profissional da área'
      ]
    },
    {
      question: 'Qual é o seu objetivo principal com investimentos?',
      options: [
        'Guardar dinheiro com segurança',
        'Crescimento moderado do patrimônio',
        'Maximizar retornos no longo prazo',
        'Gerar renda passiva mensal'
      ]
    },
    {
      question: 'Quanto você pretende investir mensalmente?',
      options: [
        'Até R$ 500',
        'R$ 500 - R$ 2.000',
        'R$ 2.000 - R$ 5.000',
        'Acima de R$ 5.000'
      ]
    },
    {
      question: 'Qual é o seu perfil de risco?',
      options: [
        'Conservador - Prefiro segurança',
        'Moderado - Aceito algum risco',
        'Arrojado - Busco altos retornos',
        'Agressivo - Aceito volatilidade alta'
      ]
    },
    {
      question: 'Qual é o seu horizonte de investimento?',
      options: [
        'Curto prazo (até 1 ano)',
        'Médio prazo (1-3 anos)',
        'Longo prazo (3-5 anos)',
        'Muito longo prazo (5+ anos)'
      ]
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [
      ...quizAnswers,
      { question: quizQuestions[currentQuestion].question, answer }
    ];
    setQuizAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentStep('result');
    }
  };

  const getRecommendedPlan = () => {
    // Lógica simples baseada nas respostas
    const investmentAmount = quizAnswers[2]?.answer || '';
    
    if (investmentAmount.includes('5.000')) {
      return 'premium';
    } else if (investmentAmount.includes('2.000')) {
      return 'pro';
    }
    return 'basic';
  };

  const plans = {
    basic: {
      name: 'Plano Básico',
      monthlyPrice: 47,
      annualPrice: 470,
      features: [
        'Análise de IA personalizada',
        'Recomendações diárias',
        'Suporte por email',
        'Acesso a 50+ ativos',
        'Dashboard completo'
      ]
    },
    pro: {
      name: 'Plano Pro',
      monthlyPrice: 97,
      annualPrice: 970,
      popular: true,
      features: [
        'Tudo do Plano Básico',
        'Análise em tempo real',
        'Alertas personalizados',
        'Suporte prioritário',
        'Acesso a 200+ ativos',
        'Relatórios avançados',
        'API de integração'
      ]
    },
    premium: {
      name: 'Plano Premium',
      monthlyPrice: 197,
      annualPrice: 1970,
      features: [
        'Tudo do Plano Pro',
        'Consultoria 1-on-1',
        'Análise de carteira ilimitada',
        'Suporte 24/7',
        'Acesso a todos os ativos',
        'Estratégias exclusivas',
        'Grupo VIP de investidores'
      ]
    }
  };

  const formatPrice = (plan: typeof plans.basic) => {
    if (billingPeriod === 'monthly') {
      return {
        price: `R$ ${plan.monthlyPrice}`,
        period: '/mês'
      };
    } else {
      const monthlyEquivalent = Math.round(plan.annualPrice / 12);
      const savings = Math.round(((plan.monthlyPrice - monthlyEquivalent) / plan.monthlyPrice) * 100);
      return {
        price: `R$ ${monthlyEquivalent}`,
        period: '/mês',
        annual: `R$ ${plan.annualPrice}/ano`,
        savings: `Economize ${savings}%`
      };
    }
  };

  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700 text-sm font-medium">Plataforma #1 de Investimentos com IA</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Invista com
                <span className="text-gray-700"> Inteligência</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Análise de investimentos com IA que aprende com você. Recomendações personalizadas para multiplicar seu patrimônio.
              </p>

              {/* Pricing Preview */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-full p-2 mb-6 shadow-sm">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      billingPeriod === 'monthly'
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Mensal
                  </button>
                  <button
                    onClick={() => setBillingPeriod('annual')}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 relative ${
                      billingPeriod === 'annual'
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Anual
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      -17%
                    </span>
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {Object.entries(plans).map(([key, plan]) => {
                    const pricing = formatPrice(plan);
                    return (
                      <div key={key} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <div className="flex items-end justify-center gap-1 mb-1">
                          <span className="text-4xl font-bold text-gray-900">{pricing.price}</span>
                          <span className="text-gray-600 mb-1">{pricing.period}</span>
                        </div>
                        {billingPeriod === 'annual' && (
                          <div className="text-center mb-4">
                            <div className="text-green-600 text-sm font-semibold">{pricing.savings}</div>
                            <div className="text-gray-600 text-xs">{pricing.annual}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('quiz')}
                className="group bg-gray-900 text-white text-lg font-bold px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-3"
              >
                Fazer Quiz e Escolher Plano
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-gray-500 text-sm mt-4">✨ Descubra o plano ideal para você em 2 minutos</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: <Users className="w-6 h-6" />, value: '50K+', label: 'Investidores' },
                { icon: <TrendingUp className="w-6 h-6" />, value: 'R$ 2.5B', label: 'Investidos' },
                { icon: <Award className="w-6 h-6" />, value: '4.9/5', label: 'Avaliação' },
                { icon: <Shield className="w-6 h-6" />, value: '100%', label: 'Seguro' }
              ].map((stat, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-3 text-gray-700">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Por que escolher o InvestSmart?
              </h2>
              <p className="text-xl text-gray-600">Tecnologia de ponta para seus investimentos</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: 'IA Avançada',
                  description: 'Algoritmos de machine learning analisam milhares de dados em tempo real para encontrar as melhores oportunidades.'
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: 'Personalização Total',
                  description: 'Recomendações baseadas no seu perfil, objetivos e tolerância ao risco. Cada estratégia é única.'
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: 'Segurança Máxima',
                  description: 'Criptografia de nível bancário e conformidade com todas as regulamentações financeiras.'
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: 'Tempo Real',
                  description: 'Alertas instantâneos sobre oportunidades e mudanças no mercado. Nunca perca uma chance.'
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: 'Dashboard Completo',
                  description: 'Visualize toda sua carteira, performance e recomendações em uma interface intuitiva.'
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: 'Suporte Expert',
                  description: 'Equipe de especialistas disponível para tirar dúvidas e ajudar nas suas decisões.'
                }
              ].map((feature, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 rounded-xl mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                O que nossos clientes dizem
              </h2>
              <p className="text-xl text-gray-600">Resultados reais de investidores reais</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Maria Silva',
                  role: 'Empresária',
                  image: '👩‍💼',
                  text: 'Aumentei meu patrimônio em 45% no primeiro ano. A IA realmente entende meu perfil e me ajuda a tomar decisões inteligentes.',
                  rating: 5
                },
                {
                  name: 'João Santos',
                  role: 'Engenheiro',
                  image: '👨‍💻',
                  text: 'Nunca tinha investido antes. O quiz me ajudou a entender meu perfil e agora invisto com confiança. Recomendo!',
                  rating: 5
                },
                {
                  name: 'Ana Costa',
                  role: 'Médica',
                  image: '👩‍⚕️',
                  text: 'O suporte é excepcional e as análises são precisas. Já indiquei para toda minha família. Vale cada centavo!',
                  rating: 5
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{testimonial.image}</div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Pronto para multiplicar seu patrimônio?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Faça o quiz e descubra a melhor estratégia para você
            </p>
            <button
              onClick={() => setCurrentStep('quiz')}
              className="bg-white text-gray-900 text-lg font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:scale-105 inline-flex items-center gap-3"
            >
              Começar Agora
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600">Pagamento 100% seguro e criptografado</p>
            </div>
            <p className="text-gray-500 text-sm">© 2024 InvestSmart. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    );
  }

  if (currentStep === 'quiz') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-xl">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gray-900 transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              {quizQuestions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleQuizAnswer(option)}
                  className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-900 rounded-xl p-6 text-left text-gray-900 font-medium transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            {/* Back Button */}
            {currentQuestion > 0 && (
              <button
                onClick={() => {
                  setCurrentQuestion(currentQuestion - 1);
                  setQuizAnswers(quizAnswers.slice(0, -1));
                }}
                className="mt-8 text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Voltar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'result') {
    const recommendedPlan = getRecommendedPlan();
    
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Result Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Análise Completa! 🎉
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Com base nas suas respostas, identificamos o plano perfeito para você
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white border border-gray-200 rounded-full p-2 mb-8 shadow-sm">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  billingPeriod === 'monthly'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 relative ${
                  billingPeriod === 'annual'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  -17%
                </span>
              </button>
            </div>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {Object.entries(plans).map(([key, plan]) => {
              const pricing = formatPrice(plan);
              return (
                <div
                  key={key}
                  className={`relative bg-white border rounded-3xl p-8 transition-all duration-300 hover:scale-105 shadow-lg ${
                    key === recommendedPlan
                      ? 'border-gray-900 shadow-2xl scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-bold px-4 py-1 rounded-full">
                      MAIS POPULAR
                    </div>
                  )}
                  {key === recommendedPlan && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                      RECOMENDADO PARA VOCÊ
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                    <div className="flex items-end justify-center gap-1 mb-2">
                      <span className="text-5xl font-bold text-gray-900">{pricing.price}</span>
                      <span className="text-gray-600 mb-2">{pricing.period}</span>
                    </div>
                    {billingPeriod === 'annual' && (
                      <div className="space-y-1">
                        <div className="text-green-600 text-sm font-semibold">{pricing.savings}</div>
                        <div className="text-gray-600 text-sm">{pricing.annual}</div>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setCurrentStep('checkout')}
                    className={`w-full font-bold py-4 rounded-xl transition-all duration-300 ${
                      key === recommendedPlan
                        ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Escolher Plano
                  </button>
                </div>
              );
            })}
          </div>

          {/* Guarantee */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Garantia de 30 dias</h3>
            <p className="text-gray-600">
              Se você não estiver satisfeito, devolvemos 100% do seu dinheiro. Sem perguntas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'checkout') {
    const recommendedPlan = getRecommendedPlan();
    const selectedPlan = plans[recommendedPlan as keyof typeof plans];
    const pricing = formatPrice(selectedPlan);

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Finalizar Compra
              </h1>
              <p className="text-gray-600">Preencha seus dados para começar</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-gray-900 font-medium mb-2">Nome Completo</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2">Telefone</label>
                <input
                  type="tel"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="block text-gray-900 font-medium mb-2">Número do Cartão</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="0000 0000 0000 0000"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-medium mb-2">Validade</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="MM/AA"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Plano selecionado</span>
                  <span className="text-gray-900 font-bold">{selectedPlan.name}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Período</span>
                  <span className="text-gray-900 font-medium">
                    {billingPeriod === 'monthly' ? 'Mensal' : 'Anual'}
                  </span>
                </div>
                {billingPeriod === 'annual' && (
                  <div className="flex items-center justify-between mb-2 text-green-600">
                    <span className="text-sm">Economia</span>
                    <span className="text-sm font-semibold">{pricing.savings}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-4 mt-4">
                  <div className="flex items-center justify-between text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <div className="text-right">
                      <div>{pricing.price}{pricing.period}</div>
                      {billingPeriod === 'annual' && (
                        <div className="text-sm text-gray-600 font-normal">{pricing.annual}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white text-lg font-bold py-4 rounded-xl hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                Finalizar Compra Segura
              </button>

              <p className="text-center text-gray-600 text-sm">
                🔒 Pagamento 100% seguro e criptografado
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
