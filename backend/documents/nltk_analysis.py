import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist

nltk.download('punkt')
nltk.download('stopwords')

class GrammarSuggestions:
    def analyze(self, text):
        tokens = word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        filtered_tokens = [word.lower() for word in tokens if word.isalpha() and word.lower() not in stop_words]
        fdist = FreqDist(filtered_tokens)
        return {'frequencies': list(fdist.items())}

class StyleSuggestions:
    def analyze(self, text):
        long_sentences = [sent for sent in nltk.sent_tokenize(text) if len(sent) > 30]  # Arbitrary length
        if long_sentences:
            return {
                'issue': 'Long Sentences',
                'suggestion': 'Consider breaking up long sentences for better clarity.',
                'examples': long_sentences
            }
        return {}

class ClaritySuggestions:
    def analyze(self, text):
        unclear_phrases = [phrase for phrase in text.split() if len(phrase) < 3]  # Example condition
        if unclear_phrases:
            return {
                'issue': 'Unclear Phrases',
                'suggestion': 'Consider revising unclear phrases.',
                'examples': unclear_phrases
            }
        return {}
