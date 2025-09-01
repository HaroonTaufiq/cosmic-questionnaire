'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, 
  FaBitcoin, 
  FaCheckCircle, 
  FaArrowRight,
  FaNetworkWired,
  FaBuilding,
  FaDollarSign,
  FaEnvelope,
  FaRocket
} from 'react-icons/fa';

interface FormData {
  tradingType: 'stocks' | 'crypto' | 'both';
  cryptoPlatforms: string[];
  stockBrokers: string[];
  investmentRange: string;
  email: string;
  otherCrypto?: string;
  otherBroker?: string;
}

const QuestionnaireForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showOtherCrypto, setShowOtherCrypto] = useState(false);
  const [showOtherBroker, setShowOtherBroker] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    getValues
  } = useForm<FormData>({
    defaultValues: {
      tradingType: undefined,
      cryptoPlatforms: [],
      stockBrokers: [],
      investmentRange: '',
      email: ''
    }
  });

  const tradingType = watch('tradingType');
  const cryptoPlatforms = watch('cryptoPlatforms');
  const stockBrokers = watch('stockBrokers');

  const steps = [
    { id: 1, title: 'Trading Type', icon: FaChartLine },
    { id: 2, title: 'Platforms', icon: FaNetworkWired, conditional: tradingType === 'crypto' || tradingType === 'both' },
    { id: 3, title: 'Brokers', icon: FaBuilding, conditional: tradingType === 'stocks' || tradingType === 'both' },
    { id: 4, title: 'Investment Range', icon: FaDollarSign },
    { id: 5, title: 'Contact', icon: FaEnvelope }
  ];

  const visibleSteps = steps.filter(step => !step.conditional || step.conditional);
  const totalSteps = visibleSteps.length;

  const handleCryptoPlatformChange = (platform: string, checked: boolean) => {
    const current = getValues('cryptoPlatforms') || [];
    if (checked) {
      setValue('cryptoPlatforms', [...current, platform]);
    } else {
      setValue('cryptoPlatforms', current.filter(p => p !== platform));
    }
  };

  const handleStockBrokerChange = (broker: string, checked: boolean) => {
    const current = getValues('stockBrokers') || [];
    if (checked) {
      setValue('stockBrokers', [...current, broker]);
    } else {
      setValue('stockBrokers', current.filter(b => b !== broker));
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return tradingType;
      case 2:
        return tradingType === 'crypto' || tradingType === 'both' ? cryptoPlatforms?.length > 0 : true;
      case 3:
        return tradingType === 'stocks' || tradingType === 'both' ? stockBrokers?.length > 0 : true;
      case 4:
        return getValues('investmentRange');
      case 5:
        return getValues('email') && isValid;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-3xl font-bold font-heading text-white mb-4 neon-glow">
          Thank You!
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Your trading preferences have been submitted successfully.
        </p>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaRocket className="text-4xl text-purple-400 mx-auto" />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {visibleSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id 
                  ? 'border-purple-400 bg-purple-400 text-white' 
                  : 'border-gray-600 text-gray-400'
              }`}>
                {currentStep > step.id ? (
                  <FaCheckCircle className="text-sm" />
                ) : (
                  <step.icon className="text-sm" />
                )}
              </div>
              {index < visibleSteps.length - 1 && (
                <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                  currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass glass-border rounded-2xl p-8"
        >
          {/* Step 1: Trading Type */}
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-8">
                <FaChartLine className="text-4xl text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  What are you trading?
                </h3>
                <p className="text-gray-300">Select your primary trading focus</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'stocks', label: 'Stocks', icon: FaBuilding, color: 'blue' },
                  { value: 'crypto', label: 'Crypto', icon: FaBitcoin, color: 'yellow' },
                  { value: 'both', label: 'Both', icon: FaNetworkWired, color: 'purple' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer group transition-all duration-300 ${
                      tradingType === option.value ? 'scale-105' : 'hover:scale-102'
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register('tradingType', { required: true })}
                      className="sr-only"
                    />
                    <div className={`glass rounded-xl p-6 text-center border-2 transition-all duration-300 ${
                      tradingType === option.value 
                        ? 'border-purple-400 bg-purple-400/20' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}>
                      <option.icon className={`text-3xl mx-auto mb-3 ${
                        tradingType === option.value ? 'text-purple-400' : 'text-gray-400'
                      }`} />
                      <span className={`font-medium font-heading ${
                        tradingType === option.value ? 'text-white' : 'text-gray-300'
                      }`}>
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Crypto Platforms */}
          {currentStep === 2 && (tradingType === 'crypto' || tradingType === 'both') && (
            <div>
              <div className="text-center mb-8">
                <FaNetworkWired className="text-4xl text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  What crypto platforms do you use?
                </h3>
                <p className="text-gray-300">Select all that apply</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {['Coinbase', 'Binance', 'Bybit', 'Kucoin', 'Kraken'].map((platform) => (
                  <label key={platform} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      value={platform}
                      checked={cryptoPlatforms?.includes(platform) || false}
                      onChange={(e) => handleCryptoPlatformChange(platform, e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                      cryptoPlatforms?.includes(platform)
                        ? 'border-purple-400 bg-purple-400'
                        : 'border-gray-600 group-hover:border-gray-500'
                    }`}>
                      {cryptoPlatforms?.includes(platform) && (
                        <FaCheckCircle className="text-white text-xs" />
                      )}
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {platform}
                    </span>
                  </label>
                ))}
              </div>
              
              <div className="mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOtherCrypto}
                    onChange={(e) => setShowOtherCrypto(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    showOtherCrypto ? 'border-purple-400 bg-purple-400' : 'border-gray-600'
                  }`}>
                    {showOtherCrypto && <FaCheckCircle className="text-white text-xs" />}
                  </div>
                  <span className="text-gray-300">Other</span>
                </label>
                
                {showOtherCrypto && (
                  <motion.input
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    type="text"
                    placeholder="Specify platform..."
                    {...register('otherCrypto')}
                    className="mt-3 w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                )}
              </div>
            </div>
          )}

          {/* Step 3: Stock Brokers */}
          {currentStep === 3 && (tradingType === 'stocks' || tradingType === 'both') && (
            <div>
              <div className="text-center mb-8">
                <FaBuilding className="text-4xl text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  What brokers do you use?
                </h3>
                <p className="text-gray-300">Select all that apply</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {['Fidelity', 'Interactive Brokers', 'Exness'].map((broker) => (
                  <label key={broker} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      value={broker}
                      checked={stockBrokers?.includes(broker) || false}
                      onChange={(e) => handleStockBrokerChange(broker, e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                      stockBrokers?.includes(broker)
                        ? 'border-purple-400 bg-purple-400'
                        : 'border-gray-600 group-hover:border-gray-500'
                    }`}>
                      {stockBrokers?.includes(broker) && (
                        <FaCheckCircle className="text-white text-xs" />
                      )}
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {broker}
                    </span>
                  </label>
                ))}
              </div>
              
              <div className="mb-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOtherBroker}
                    onChange={(e) => setShowOtherBroker(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    showOtherBroker ? 'border-purple-400 bg-purple-400' : 'border-gray-600'
                  }`}>
                    {showOtherBroker && <FaCheckCircle className="text-white text-xs" />}
                  </div>
                  <span className="text-gray-300">Other</span>
                </label>
                
                {showOtherBroker && (
                  <motion.input
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    type="text"
                    placeholder="Specify broker..."
                    {...register('otherBroker')}
                    className="mt-3 w-full px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                )}
              </div>
            </div>
          )}

          {/* Step 4: Investment Range */}
          {currentStep === 4 && (
            <div>
              <div className="text-center mb-8">
                <FaDollarSign className="text-4xl text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  Whats your investment range?
                </h3>
                <p className="text-gray-300">Select the range that best describes your portfolio</p>
              </div>
              
              <div className="space-y-4">
                {[
                  '0 to 1,000 USD',
                  '1,000 to 10,000 USD',
                  '10,000 to 100,000 USD',
                  '100,000 USD and more'
                ].map((range) => (
                  <label key={range} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      value={range}
                      {...register('investmentRange', { required: true })}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      getValues('investmentRange') === range
                        ? 'border-purple-400 bg-purple-400'
                        : 'border-gray-600 group-hover:border-gray-500'
                    }`}>
                      {getValues('investmentRange') === range && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {range}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Email */}
          {currentStep === 5 && (
            <div>
              <div className="text-center mb-8">
                <FaEnvelope className="text-4xl text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-heading text-white mb-2">
                  Almost done!
                </h3>
                <p className="text-gray-300">Enter your email to complete the submission</p>
              </div>
              
              <div className="max-w-md mx-auto">
                <label className="block text-gray-300 mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium font-heading transition-all duration-300 ${
                currentStep === 1
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className={`px-6 py-3 rounded-lg font-medium font-heading transition-all duration-300 flex items-center space-x-2 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/25'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <FaArrowRight className="text-sm" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canProceed() || isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className={`px-8 py-3 rounded-lg font-medium font-heading transition-all duration-300 flex items-center space-x-2 ${
                  canProceed() && !isSubmitting
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-purple-500/25 animate-pulse-glow'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <FaRocket className="text-sm" />
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuestionnaireForm; 