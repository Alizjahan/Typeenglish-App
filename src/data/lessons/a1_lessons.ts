import { Unit } from '../../types';
import { a1Grammar } from '../grammar/a1_grammar';

const getGrammar = (id: string) => a1Grammar.find(g => g.id === id) || a1Grammar[0];

const rawUnits = [
  {
    "id": "a1-u1",
    "levelId": "A1",
    "number": 1,
    "title": "Unit 1 - Introductions & Greetings",
    "persianTitle": "بخش 1 - معرفی و احوالپرسی",
    "description": "Learn how to introduce yourself.",
    "descriptionFa": "معرفی خود را یاد بگیرید.",
    "lessons": [
      {
        "id": "a1-u1-l1",
        "unitId": "a1-u1",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "Hello, my name is Alex.",
          "persian": "سلام، اسم من الکس است.",
          "tokens": [
            {
              "text": "Hello,",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Greetings", "fa": "احوال‌پرسی" },
          "keyRule": { "en": "Use these expressions when meeting people.", "fa": "این عبارات برای برخورد اولیه و احوال‌پرسی استفاده می‌شوند." },
          "pattern": "Expression + Subject",
          "examples": [
            { "en": "Hello, my name is Alex.", "fa": "سلام، اسم من الکس است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u1-l1-ex1",
            "type": "fill_blank",
            "question": "___ my name is Alex.",
            "persianPrompt": "سلام، اسم من الکس است.",
            "options": [
              "Hello,",
              "Are",
              "Is"
            ],
            "correctAnswer": "Hello,",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u1-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "سلام، اسم من الکس است.",
            "wordsToReorder": [
              "Hello,",
              "my",
              "name",
              "is",
              "Alex"
            ],
            "correctAnswer": "Hello, my name is Alex",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u1-l2",
        "unitId": "a1-u1",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "Nice to meet you.",
          "persian": "از دیدن شما خوشبختم.",
          "tokens": [
            {
              "text": "Nice",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Greetings", "fa": "احوال‌پرسی" },
          "keyRule": { "en": "Use these expressions when meeting people.", "fa": "این عبارات برای برخورد اولیه و احوال‌پرسی استفاده می‌شوند." },
          "pattern": "Expression + Subject",
          "examples": [
            { "en": "Nice to meet you.", "fa": "از دیدن شما خوشبختم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u1-l2-ex1",
            "type": "fill_blank",
            "question": "___ to meet you.",
            "persianPrompt": "از دیدن شما خوشبختم.",
            "options": [
              "Nice",
              "Are",
              "Is"
            ],
            "correctAnswer": "Nice",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u1-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "از دیدن شما خوشبختم.",
            "wordsToReorder": [
              "Nice",
              "to",
              "meet",
              "you"
            ],
            "correctAnswer": "Nice to meet you",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u1-l3",
        "unitId": "a1-u1",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Where are you from?",
          "persian": "شما اهل کجا هستید؟",
          "tokens": [
            {
              "text": "Where",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "Where are you from?", "fa": "شما اهل کجا هستید؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u1-l3-ex1",
            "type": "fill_blank",
            "question": "___ are you from?",
            "persianPrompt": "شما اهل کجا هستید؟",
            "options": [
              "Where",
              "Are",
              "Is"
            ],
            "correctAnswer": "Where",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u1-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "شما اهل کجا هستید؟",
            "wordsToReorder": [
              "Where",
              "are",
              "you",
              "from"
            ],
            "correctAnswer": "Where are you from",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u1-l4",
        "unitId": "a1-u1",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "I am from Canada.",
          "persian": "من اهل کانادا هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am from Canada.", "fa": "من اهل کانادا هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u1-l4-ex1",
            "type": "fill_blank",
            "question": "___ am from Canada.",
            "persianPrompt": "من اهل کانادا هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u1-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من اهل کانادا هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "from",
              "Canada"
            ],
            "correctAnswer": "I am from Canada",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u2",
    "levelId": "A1",
    "number": 2,
    "title": "Unit 2 - Family & Friends",
    "persianTitle": "بخش 2 - خانواده و دوستان",
    "description": "Talk about your family members.",
    "descriptionFa": "درباره اعضای خانواده صحبت کنید.",
    "lessons": [
      {
        "id": "a1-u2-l1",
        "unitId": "a1-u2",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "I have a big family.",
          "persian": "من خانواده بزرگی دارم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Possession: Have / Has", "fa": "داشتن: Have / Has" },
          "keyRule": { "en": "Use 'have' or 'has' to talk about things you own.", "fa": "فعل have و has برای نشان دادن مالکیت استفاده می‌شوند." },
          "pattern": "Subject + have/has + Noun",
          "examples": [
            { "en": "I have a big family.", "fa": "من خانواده بزرگی دارم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u2-l1-ex1",
            "type": "fill_blank",
            "question": "___ have a big family.",
            "persianPrompt": "من خانواده بزرگی دارم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u2-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من خانواده بزرگی دارم.",
            "wordsToReorder": [
              "I",
              "have",
              "a",
              "big",
              "family"
            ],
            "correctAnswer": "I have a big family",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u2-l2",
        "unitId": "a1-u2",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "She is my younger sister.",
          "persian": "او خواهر کوچکتر من است.",
          "tokens": [
            {
              "text": "She",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "She is my younger sister.", "fa": "او خواهر کوچکتر من است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u2-l2-ex1",
            "type": "fill_blank",
            "question": "___ is my younger sister.",
            "persianPrompt": "او خواهر کوچکتر من است.",
            "options": [
              "She",
              "Are",
              "Is"
            ],
            "correctAnswer": "She",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u2-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "او خواهر کوچکتر من است.",
            "wordsToReorder": [
              "She",
              "is",
              "my",
              "younger",
              "sister"
            ],
            "correctAnswer": "She is my younger sister",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u2-l3",
        "unitId": "a1-u2",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "My father is a teacher.",
          "persian": "پدر من یک معلم است.",
          "tokens": [
            {
              "text": "My",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "My father is a teacher.", "fa": "پدر من یک معلم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u2-l3-ex1",
            "type": "fill_blank",
            "question": "___ father is a teacher.",
            "persianPrompt": "پدر من یک معلم است.",
            "options": [
              "My",
              "Are",
              "Is"
            ],
            "correctAnswer": "My",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u2-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "پدر من یک معلم است.",
            "wordsToReorder": [
              "My",
              "father",
              "is",
              "a",
              "teacher"
            ],
            "correctAnswer": "My father is a teacher",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u2-l4",
        "unitId": "a1-u2",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "Do you have any brothers?",
          "persian": "آیا برادری داری؟",
          "tokens": [
            {
              "text": "Do",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Present Simple Questions", "fa": "سوالات حال ساده" },
          "keyRule": { "en": "Use 'do' or 'does' to ask yes/no questions.", "fa": "برای سوالی کردن زمان حال ساده از Do یا Does استفاده می‌شود." },
          "pattern": "Do/Does + Subject + Verb",
          "examples": [
            { "en": "Do you have any brothers?", "fa": "آیا برادری داری؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u2-l4-ex1",
            "type": "fill_blank",
            "question": "___ you have any brothers?",
            "persianPrompt": "آیا برادری داری؟",
            "options": [
              "Do",
              "Are",
              "Is"
            ],
            "correctAnswer": "Do",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u2-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "آیا برادری داری؟",
            "wordsToReorder": [
              "Do",
              "you",
              "have",
              "any",
              "brothers"
            ],
            "correctAnswer": "Do you have any brothers",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u3",
    "levelId": "A1",
    "number": 3,
    "title": "Unit 3 - Daily Routine",
    "persianTitle": "بخش 3 - روزمرگی",
    "description": "Describe your daily habits.",
    "descriptionFa": "عادات روزانه خود را توصیف کنید.",
    "lessons": [
      {
        "id": "a1-u3-l1",
        "unitId": "a1-u3",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "I wake up at seven o'clock.",
          "persian": "من ساعت هفت بیدار می‌شوم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Present Simple", "fa": "زمان حال ساده" },
          "keyRule": { "en": "Use the present simple to talk about facts and habits.", "fa": "حال ساده برای بیان حقایق و عادات استفاده می‌شود." },
          "pattern": "Subject + Verb",
          "examples": [
            { "en": "I wake up at seven o'clock.", "fa": "من ساعت هفت بیدار می‌شوم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u3-l1-ex1",
            "type": "fill_blank",
            "question": "___ wake up at seven o'clock.",
            "persianPrompt": "من ساعت هفت بیدار می‌شوم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u3-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من ساعت هفت بیدار می‌شوم.",
            "wordsToReorder": [
              "I",
              "wake",
              "up",
              "at",
              "seven",
              "o'clock"
            ],
            "correctAnswer": "I wake up at seven o'clock",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u3-l2",
        "unitId": "a1-u3",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I drink coffee in the morning.",
          "persian": "من صبح‌ها قهوه می‌نوشم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Present Simple", "fa": "زمان حال ساده" },
          "keyRule": { "en": "Use the present simple to talk about facts and habits.", "fa": "حال ساده برای بیان حقایق و عادات استفاده می‌شود." },
          "pattern": "Subject + Verb",
          "examples": [
            { "en": "I drink coffee in the morning.", "fa": "من صبح‌ها قهوه می‌نوشم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u3-l2-ex1",
            "type": "fill_blank",
            "question": "___ drink coffee in the morning.",
            "persianPrompt": "من صبح‌ها قهوه می‌نوشم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u3-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من صبح‌ها قهوه می‌نوشم.",
            "wordsToReorder": [
              "I",
              "drink",
              "coffee",
              "in",
              "the",
              "morning"
            ],
            "correctAnswer": "I drink coffee in the morning",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u3-l3",
        "unitId": "a1-u3",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "He goes to work by bus.",
          "persian": "او با اتوبوس به سر کار می‌رود.",
          "tokens": [
            {
              "text": "He",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Present Simple", "fa": "زمان حال ساده" },
          "keyRule": { "en": "Use the present simple to talk about facts and habits.", "fa": "حال ساده برای بیان حقایق و عادات استفاده می‌شود." },
          "pattern": "Subject + Verb",
          "examples": [
            { "en": "He goes to work by bus.", "fa": "او با اتوبوس به سر کار می‌رود." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u3-l3-ex1",
            "type": "fill_blank",
            "question": "___ goes to work by bus.",
            "persianPrompt": "او با اتوبوس به سر کار می‌رود.",
            "options": [
              "He",
              "Are",
              "Is"
            ],
            "correctAnswer": "He",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u3-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "او با اتوبوس به سر کار می‌رود.",
            "wordsToReorder": [
              "He",
              "goes",
              "to",
              "work",
              "by",
              "bus"
            ],
            "correctAnswer": "He goes to work by bus",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u3-l4",
        "unitId": "a1-u3",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "We eat dinner together.",
          "persian": "ما با هم شام می‌خوریم.",
          "tokens": [
            {
              "text": "We",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Present Simple", "fa": "زمان حال ساده" },
          "keyRule": { "en": "Use the present simple to talk about facts and habits.", "fa": "حال ساده برای بیان حقایق و عادات استفاده می‌شود." },
          "pattern": "Subject + Verb",
          "examples": [
            { "en": "We eat dinner together.", "fa": "ما با هم شام می‌خوریم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u3-l4-ex1",
            "type": "fill_blank",
            "question": "___ eat dinner together.",
            "persianPrompt": "ما با هم شام می‌خوریم.",
            "options": [
              "We",
              "Are",
              "Is"
            ],
            "correctAnswer": "We",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u3-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "ما با هم شام می‌خوریم.",
            "wordsToReorder": [
              "We",
              "eat",
              "dinner",
              "together"
            ],
            "correctAnswer": "We eat dinner together",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u4",
    "levelId": "A1",
    "number": 4,
    "title": "Unit 4 - Work & Jobs",
    "persianTitle": "بخش 4 - کار و مشاغل",
    "description": "Talk about professions.",
    "descriptionFa": "درباره شغل‌ها صحبت کنید.",
    "lessons": [
      {
        "id": "a1-u4-l1",
        "unitId": "a1-u4",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u4-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u4-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u4-l2",
        "unitId": "a1-u4",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u4-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u4-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u4-l3",
        "unitId": "a1-u4",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u4-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u4-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u4-l4",
        "unitId": "a1-u4",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u4-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u4-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u5",
    "levelId": "A1",
    "number": 5,
    "title": "Unit 5 - Free Time & Hobbies",
    "persianTitle": "بخش 5 - اوقات فراغت",
    "description": "Discuss what you do for fun.",
    "descriptionFa": "درباره سرگرمی‌هایتان صحبت کنید.",
    "lessons": [
      {
        "id": "a1-u5-l1",
        "unitId": "a1-u5",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u5-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u5-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u5-l2",
        "unitId": "a1-u5",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u5-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u5-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u5-l3",
        "unitId": "a1-u5",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u5-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u5-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u5-l4",
        "unitId": "a1-u5",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u5-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u5-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u6",
    "levelId": "A1",
    "number": 6,
    "title": "Unit 6 - Food & Drink",
    "persianTitle": "بخش 6 - غذا و نوشیدنی",
    "description": "Order food and talk about meals.",
    "descriptionFa": "سفارش غذا و مکالمات رستوران.",
    "lessons": [
      {
        "id": "a1-u6-l1",
        "unitId": "a1-u6",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u6-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u6-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u6-l2",
        "unitId": "a1-u6",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u6-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u6-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u6-l3",
        "unitId": "a1-u6",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u6-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u6-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u6-l4",
        "unitId": "a1-u6",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u6-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u6-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u7",
    "levelId": "A1",
    "number": 7,
    "title": "Unit 7 - Shopping & Clothes",
    "persianTitle": "بخش 7 - خرید و لباس",
    "description": "Buying things and describing clothes.",
    "descriptionFa": "خرید کردن و توصیف لباس‌ها.",
    "lessons": [
      {
        "id": "a1-u7-l1",
        "unitId": "a1-u7",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u7-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u7-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u7-l2",
        "unitId": "a1-u7",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u7-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u7-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u7-l3",
        "unitId": "a1-u7",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u7-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u7-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u7-l4",
        "unitId": "a1-u7",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u7-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u7-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u8",
    "levelId": "A1",
    "number": 8,
    "title": "Unit 8 - Home & Furniture",
    "persianTitle": "بخش 8 - خانه و وسایل",
    "description": "Describe your house.",
    "descriptionFa": "توصیف خانه و وسایل آن.",
    "lessons": [
      {
        "id": "a1-u8-l1",
        "unitId": "a1-u8",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u8-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u8-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u8-l2",
        "unitId": "a1-u8",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u8-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u8-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u8-l3",
        "unitId": "a1-u8",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u8-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u8-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u8-l4",
        "unitId": "a1-u8",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u8-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u8-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u9",
    "levelId": "A1",
    "number": 9,
    "title": "Unit 9 - Places & Directions",
    "persianTitle": "بخش 9 - مکان‌ها و آدرس",
    "description": "Ask for and give directions.",
    "descriptionFa": "پرسیدن و آدرس دادن.",
    "lessons": [
      {
        "id": "a1-u9-l1",
        "unitId": "a1-u9",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u9-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u9-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u9-l2",
        "unitId": "a1-u9",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u9-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u9-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u9-l3",
        "unitId": "a1-u9",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u9-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u9-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u9-l4",
        "unitId": "a1-u9",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u9-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u9-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u10",
    "levelId": "A1",
    "number": 10,
    "title": "Unit 10 - Travel & Holidays",
    "persianTitle": "بخش 10 - سفر و تعطیلات",
    "description": "Talk about past or future trips.",
    "descriptionFa": "صحبت درباره سفرها.",
    "lessons": [
      {
        "id": "a1-u10-l1",
        "unitId": "a1-u10",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u10-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u10-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u10-l2",
        "unitId": "a1-u10",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u10-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u10-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u10-l3",
        "unitId": "a1-u10",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u10-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u10-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u10-l4",
        "unitId": "a1-u10",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u10-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u10-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u11",
    "levelId": "A1",
    "number": 11,
    "title": "Unit 11 - Health & Body",
    "persianTitle": "بخش 11 - سلامتی و بدن",
    "description": "Talk about how you feel.",
    "descriptionFa": "صحبت درباره سلامتی و اعضای بدن.",
    "lessons": [
      {
        "id": "a1-u11-l1",
        "unitId": "a1-u11",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u11-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u11-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u11-l2",
        "unitId": "a1-u11",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u11-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u11-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u11-l3",
        "unitId": "a1-u11",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u11-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u11-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u11-l4",
        "unitId": "a1-u11",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u11-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u11-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u12",
    "levelId": "A1",
    "number": 12,
    "title": "Unit 12 - Weather & Seasons",
    "persianTitle": "بخش 12 - آب و هوا و فصل‌ها",
    "description": "Describe the weather.",
    "descriptionFa": "توصیف آب و هوا و فصل‌ها.",
    "lessons": [
      {
        "id": "a1-u12-l1",
        "unitId": "a1-u12",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u12-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u12-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u12-l2",
        "unitId": "a1-u12",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u12-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u12-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u12-l3",
        "unitId": "a1-u12",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u12-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u12-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u12-l4",
        "unitId": "a1-u12",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u12-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u12-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u13",
    "levelId": "A1",
    "number": 13,
    "title": "Unit 13 - Time & Dates",
    "persianTitle": "بخش 13 - زمان و تاریخ",
    "description": "Tell the time and dates.",
    "descriptionFa": "بیان ساعت، روزها و تاریخ.",
    "lessons": [
      {
        "id": "a1-u13-l1",
        "unitId": "a1-u13",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u13-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u13-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u13-l2",
        "unitId": "a1-u13",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u13-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u13-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u13-l3",
        "unitId": "a1-u13",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u13-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u13-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u13-l4",
        "unitId": "a1-u13",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u13-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u13-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u14",
    "levelId": "A1",
    "number": 14,
    "title": "Unit 14 - Likes & Dislikes",
    "persianTitle": "بخش 14 - علایق",
    "description": "Express what you love or hate.",
    "descriptionFa": "بیان چیزهایی که دوست دارید یا ندارید.",
    "lessons": [
      {
        "id": "a1-u14-l1",
        "unitId": "a1-u14",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u14-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u14-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u14-l2",
        "unitId": "a1-u14",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u14-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u14-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u14-l3",
        "unitId": "a1-u14",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u14-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u14-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u14-l4",
        "unitId": "a1-u14",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u14-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u14-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  },
  {
    "id": "a1-u15",
    "levelId": "A1",
    "number": 15,
    "title": "Unit 15 - Future Plans",
    "persianTitle": "بخش 15 - برنامه‌های آینده",
    "description": "Talk about your intentions.",
    "descriptionFa": "صحبت درباره برنامه‌های آینده.",
    "lessons": [
      {
        "id": "a1-u15-l1",
        "unitId": "a1-u15",
        "number": 1,
        "title": "Lesson 1",
        "persianTitle": "درس 1",
        "targetSentence": {
          "text": "This is a very important sentence.",
          "persian": "این یک جمله بسیار مهم است.",
          "tokens": [
            {
              "text": "This",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "This is a very important sentence.", "fa": "این یک جمله بسیار مهم است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u15-l1-ex1",
            "type": "fill_blank",
            "question": "___ is a very important sentence.",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "options": [
              "This",
              "Are",
              "Is"
            ],
            "correctAnswer": "This",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u15-l1-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "این یک جمله بسیار مهم است.",
            "wordsToReorder": [
              "This",
              "is",
              "a",
              "very",
              "important",
              "sentence"
            ],
            "correctAnswer": "This is a very important sentence",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u15-l2",
        "unitId": "a1-u15",
        "number": 2,
        "title": "Lesson 2",
        "persianTitle": "درس 2",
        "targetSentence": {
          "text": "I am learning English every day.",
          "persian": "من هر روز در حال یادگیری انگلیسی هستم.",
          "tokens": [
            {
              "text": "I",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "I am learning English every day.", "fa": "من هر روز در حال یادگیری انگلیسی هستم." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u15-l2-ex1",
            "type": "fill_blank",
            "question": "___ am learning English every day.",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "options": [
              "I",
              "Are",
              "Is"
            ],
            "correctAnswer": "I",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u15-l2-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "من هر روز در حال یادگیری انگلیسی هستم.",
            "wordsToReorder": [
              "I",
              "am",
              "learning",
              "English",
              "every",
              "day"
            ],
            "correctAnswer": "I am learning English every day",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u15-l3",
        "unitId": "a1-u15",
        "number": 3,
        "title": "Lesson 3",
        "persianTitle": "درس 3",
        "targetSentence": {
          "text": "Can you help me with this?",
          "persian": "می‌تونی در این مورد کمکم کنی؟",
          "tokens": [
            {
              "text": "Can",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Ability with 'Can'", "fa": "توانایی با Can" },
          "keyRule": { "en": "Use 'can' to show ability or permission.", "fa": "از can برای بیان توانایی انجام کاری استفاده می‌کنیم." },
          "pattern": "Subject + can + Verb",
          "examples": [
            { "en": "Can you help me with this?", "fa": "می‌تونی در این مورد کمکم کنی؟" }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u15-l3-ex1",
            "type": "fill_blank",
            "question": "___ you help me with this?",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "options": [
              "Can",
              "Are",
              "Is"
            ],
            "correctAnswer": "Can",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u15-l3-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "می‌تونی در این مورد کمکم کنی؟",
            "wordsToReorder": [
              "Can",
              "you",
              "help",
              "me",
              "with",
              "this"
            ],
            "correctAnswer": "Can you help me with this",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      },
      {
        "id": "a1-u15-l4",
        "unitId": "a1-u15",
        "number": 4,
        "title": "Lesson 4",
        "persianTitle": "درس 4",
        "targetSentence": {
          "text": "It is a beautiful day today.",
          "persian": "امروز روز زیبایی است.",
          "tokens": [
            {
              "text": "It",
              "role": "word",
              "roleFa": "کلمه",
              "explanationFa": "بخش اول جمله"
            }
          ]
        },
        "vocabulary": [],
        "studyNote": {
          "concept": { "en": "Verb 'To Be'", "fa": "فعل بودن" },
          "keyRule": { "en": "Use 'to be' for identity, location, and feelings.", "fa": "برای توصیف وضعیت، نام و ملیت از am, is, are استفاده می‌کنیم." },
          "pattern": "Subject + am/is/are",
          "examples": [
            { "en": "It is a beautiful day today.", "fa": "امروز روز زیبایی است." }
          ]
        },
        "grammarPoint": {
          "id": "a1-g-basic"
        },
        "practiceExercises": [
          {
            "id": "a1-u15-l4-ex1",
            "type": "fill_blank",
            "question": "___ is a beautiful day today.",
            "persianPrompt": "امروز روز زیبایی است.",
            "options": [
              "It",
              "Are",
              "Is"
            ],
            "correctAnswer": "It",
            "explanationFa": "گزینه صحیح را انتخاب کنید."
          },
          {
            "id": "a1-u15-l4-ex2",
            "type": "reorder",
            "question": "Arrange the words correctly:",
            "persianPrompt": "امروز روز زیبایی است.",
            "wordsToReorder": [
              "It",
              "is",
              "a",
              "beautiful",
              "day",
              "today"
            ],
            "correctAnswer": "It is a beautiful day today",
            "explanationFa": "ترتیب صحیح کلمات در جمله."
          }
        ]
      }
    ]
  }
];

export const a1Units: Unit[] = rawUnits.map((u: any) => ({
  ...u,
  lessons: u.lessons.map((l: any) => ({
    ...l,
    grammarPoint: getGrammar(l.grammarPoint.id)
  }))
}));
