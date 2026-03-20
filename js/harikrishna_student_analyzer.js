// Student Data
const students = [
{
    name: "Lalit",
    marks: [
        { subject: "Math", score: 78 },
        { subject: "English", score: 82 },
        { subject: "Science", score: 74 },
        { subject: "History", score: 69 },
        { subject: "Computer", score: 88 }
    ],
    attendance: 82
},
{
    name: "Rahul",
    marks: [
        { subject: "Math", score: 90 },
        { subject: "English", score: 85 },
        { subject: "Science", score: 80 },
        { subject: "History", score: 76 },
        { subject: "Computer", score: 92 }
    ],
    attendance: 91
}
];
//function to calculate total marks for each student
function calculateTotal(student) {
    let total = 0;
    student.marks.forEach(m => total += m.score);
    return total;
}

students.forEach(s => {
    console.log(`${s.name} Total Marks: ${calculateTotal(s)}`);
});

//function to calculate average marks for each student

function calculateAverage(student) {
    return calculateTotal(student) / student.marks.length;
}

students.forEach(s => {
    console.log(`${s.name} Average: ${calculateAverage(s).toFixed(2)}`);
});

//function to find highest scorer in each subject
function subjectHighest() {
    let subjects = {};

    students.forEach(s => {
        s.marks.forEach(m => {
            if (!subjects[m.subject] || m.score > subjects[m.subject].score) {
                subjects[m.subject] = { name: s.name, score: m.score };
            }
        });
    });

    for (let sub in subjects) {
        console.log(`Highest in ${sub}: ${subjects[sub].name} (${subjects[sub].score})`);
    }
}

subjectHighest();

//function to find average score in each subject
function subjectAverage() {
    let subjects = {};

    students.forEach(s => {
        s.marks.forEach(m => {
            if (!subjects[m.subject]) {
                subjects[m.subject] = { total: 0, count: 0 };
            }
            subjects[m.subject].total += m.score;
            subjects[m.subject].count++;
        });
    });

    for (let sub in subjects) {
        let avg = subjects[sub].total / subjects[sub].count;
        console.log(`Average ${sub}: ${avg.toFixed(2)}`);
    }
}

subjectAverage();

//function to find class topper
function findTopper() {
    let topper = null;
    let highest = 0;

    students.forEach(s => {
        let total = calculateTotal(s);
        if (total > highest) {
            highest = total;
            topper = s.name;
        }
    });

    console.log(`Class Topper: ${topper} with ${highest} marks`);
}

findTopper();

//function to assign grades based on average marks and attendance

function getGrade(student) {
    let avg = calculateAverage(student);

    // Check fail condition
    let failedSubject = student.marks.find(m => m.score <= 40);

    if (failedSubject) {
        return `Fail (Failed in ${failedSubject.subject})`;
    }

    if (student.attendance < 75) {
        return "Fail (Low Attendance)";
    }

    if (avg >= 85) return "A";
    if (avg >= 70) return "B";
    if (avg >= 50) return "C";

    return "Fail";
}

students.forEach(s => {
    console.log(`${s.name} Grade: ${getGrade(s)}`);
});