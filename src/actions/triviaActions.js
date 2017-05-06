import * as types from '../constants/actionTypes'

let triviaActions = {

  saveTriviaQuestion: function(questionText) {
    return { 
    	type: types.SAVE_TRIVIA_QUESTION,
  	  questionText: questionText
    }
  },

  saveTriviaCorrectAnswer: function(correctAnswer) {
    return { 
      type: types.SAVE_TRIVIA_CORRECT_ANSWER,
      correctAnswer: correctAnswer
    }
  },

}

export default triviaActions