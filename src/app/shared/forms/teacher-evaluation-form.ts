export const TeacherEvaluationForm = [
    {
        q_id: 1,
        question: "The Instructor is prepared for each class"
    },
    {
        q_id: 2,
        question: "The Instructor demonstrates knowledge of the subject"
    },
    {
        q_id: 3,
        question: "The Instructor has completed the whole course"
    },
    {
        q_id: 4,
        question: "The Instructor provides additional material apart from the textbook"
    },
    {
        q_id: 5,
        question: "The Instructor gives citations regarding current situations with reference to Pakistani context"
    },
    {
        q_id: 6,
        question: "The Instructor communicates the subject matter effectively"
    },
    {
        q_id: 7,
        question: "The Instructor shows respect towards students and encourages class participation"
    },
    {
        q_id: 8,
        question: "The Instructor maintains an environment that is conducive to learning"
    },
    {
        q_id: 9,
        question: "The Instructor arrives on time"
    },
    {
        q_id: 10,
        question: "The Instructor leaves on time"
    },
    {
        q_id: 11,
        question: "The Instructor is fair in examination"
    },
    {
        q_id: 12,
        question: "The Instructor returns the graded scripts etc. in a reasonable amount of time"
    },
    {
        q_id: 13,
        question: "The Instructor was available during the specified office hours and for after class consultations"
    },
    {
        q_id: 14,
        question: "The Subject matter presented in the course has increased your knowledge of the subject"
    },
    {
        q_id: 15,
        question: "The syllabus clearly states course objectives requirements, procedures and grading criteria"
    },
    {
        q_id: 16,
        question: "The course integrates theoretical course concepts with real-world applications"
    },
    {
        q_id: 17,
        question: "The assignments and exams covered the materials presented in the course"
    },
    {
        q_id: 18,
        question: "The course material is modern and updated "
    },
    {
        q_id: 19,
        question: "Comments "
    }
]

export const courseEvaluationForm = [
    {
        'name': 'Course Content and Organization', 
        'questionArray': [
            {
                q_id: 1,
                question: "The course objectives were clear",
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 2,
                question: "The course workload was manageable"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 3,
                question: "The course was well organized(e.g., timely access to materials, notification of canges, etc.)"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 4,
                question: "Comments",
                type: 'textarea'        
            }
        ]         
    },
    {
        'name': 'Student Contribution', 
        'questionArray': [
            {
                q_id: 5,
                question: "Approximate level of your attendance during the whole course"        ,
                type: 'single-select',
                options: ['<20%', '21-40%', '41-60%', '61-80%', '>81%']
            },
            {
                q_id: 6,
                question: "I participated actively in the course",
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 7,
                question: "I think I have made progress in this course"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 8,
                question: "Comments",
                type: 'textarea'        
            }
        ]         
    },
    {
        'name': 'Learning Environment and Teaching Methods', 
        'questionArray': [
            {
                q_id: 9,
                question: "I think the course was well structured to acheieve the leraning outcomes(there was a good balance of lectures, tutorials, practical etc.)"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 10,
                question: "The learning and teaching methods encrouged participation"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 11,
                question: "The overall environment in the class was conducive to learning"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 12,
                question: "Classrooms were satisfactory"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 13,
                question: "Comments" ,
                type: 'textarea'       
            }
        ]         
    },
    {
        'name': 'Learning Resources', 
        'questionArray': [
            {
                q_id: 14,
                question: "Learning materials(Lesson Plans, Course Notes etc) were relevant and useful"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 15,
                question: "Recommended reading books etc. were relevent and appropriate"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 16,
                question: "The provision of learning resources in the library was adequate and appropriate"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 17,
                question: "The provision of learning resources on the web was adequate and appropriate(if relevant)"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 18,
                question: "Comments" ,
                type: "textarea"       
            }
        ]         
    },
    {
        'name': 'Quality of Delivery', 
        'questionArray': [
            {
                q_id: 19,
                question: "The course stimulated my interest and thought on the subject area"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 20,
                question: "The pace of the course was appropriate"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 21,
                question: "Ideas and concepts were presented clearly"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 22,
                question: "Comments",
                type: 'textarea'        
            }
        ]         
    },
    {
        'name': 'Assessment', 
        'questionArray': [
            {
                q_id: 23,
                question: "The method of assesment were reasonable"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 24,
                question: "Feedback on assesment was timely"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 25,
                question: "Feedback on assesment was helpful"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 26,
                question: "Comments",
                type: 'textarea'       
            }
        ]         
    },
    {
        'name': 'Instructor / Teaching Assistant Evaluation', 
        'questionArray': [
            {
                q_id: 27,
                question: "I understood the lectures"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 28,
                question: "The material was well organized and presented"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 29,
                question: "The instructor was responseive to student needs and problems"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 30,
                question: "Had the instructor been regular throught the course?"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            }
        ]         
    },
    {
        'name': 'Tutorial', 
        'questionArray': [
            {
                q_id: 31,
                question: "The material in the tutorials was helpful"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 32,
                question: "I was happy with the amount of work needed for tutorials"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 33,
                question: "The tutor dealt effectively with my problems."        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
        ]         
    },
    {
        'name': 'Practical', 
        'questionArray': [
            {
                q_id: 34,
                question: "The material in the practicals was useful"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
            {
                q_id: 35,
                question: "The demonstrators dealt effectively with my problems"        ,
                type: 'single-select',
                options: ['Strongly Disagree', 'Disagree', 'Average', 'Agree', 'Strongly Agree']
            },
        ]         
    },
    {
        'name': 'Overall Evaluation', 
        'questionArray': [
            {
                q_id: 36,
                question: "The best features of course were:"        ,
                type: 'textarea'
            },
            {
                q_id: 37,
                question: "The course could have been improved by:"        ,
                type: 'textarea'
            },
        ]         
    },
    {
        'name': 'Equal Opportunites Monitoring(Optional)', 
        'questionArray': [
            {
                q_id: 38,
                question: "The university does not tolerate discrimaination on any irrelevant distiction(e.g., race, age, gender) and is committed to work with diversity in a wholly positive way. Please indicate below anything in rlation to this course which may run counter to this objective:"        ,
                type: "textarea"
            },
        ]         
    },
    {
        'name': 'Demographic Information(Optional)', 
        'questionArray': [
            {
                q_id: 39,
                question: "Full/part time study",
                type: 'single-select',
                options: ['Full time', 'Part time']        
            },
            {
                q_id: 40,
                question: "Do you consider yourself to be disabled"        ,
                type: 'single-select',
                options: ['Yes', 'No']        
            },
            {
                q_id: 41,
                question: "Domicile",
                type: 'text'        
            },
            {
                q_id: 42,
                question: "Gender"       ,
                type:'single-select',
                options: ['Male', 'Female'] 
            },
            {
                q_id: 43,
                question: "Age Group",
                type: 'single-select',
                options: ['less than  22', '22-29', 'over 29']
            },
            {
                q_id: 44,
                question: "Campus",
                type: 'text'        
            },
        ]         
    }

]