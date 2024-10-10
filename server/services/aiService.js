import * as tf from '@tensorflow/tfjs-node';
import natural from 'natural';
import { LinearRegression } from 'ml-regression';
import moment from 'moment';
import { NlpManager } from 'node-nlp';

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

export const predictDemand = async (historicalData) => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 32, inputShape: [1], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1 }));
  
  model.compile({ 
    loss: 'meanSquaredError', 
    optimizer: tf.train.adam(0.01),
    metrics: ['mse']
  });

  const xs = tf.tensor2d(historicalData.map(d => [d.date]), [historicalData.length, 1]);
  const ys = tf.tensor2d(historicalData.map(d => [d.demand]), [historicalData.length, 1]);

  await model.fit(xs, ys, { 
    epochs: 100, 
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs.loss.toFixed(4)}, val_loss = ${logs.val_loss.toFixed(4)}`);
      }
    }
  });

  const futureDates = [...Array(30)].map((_, i) => moment().add(i, 'days').valueOf());
  const predictions = model.predict(tf.tensor2d(futureDates, [futureDates.length, 1]));

  return Array.from(predictions.dataSync());
};

// ... rest of the file remains the same