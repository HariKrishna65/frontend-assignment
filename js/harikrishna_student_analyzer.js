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
function calculateTotal(student) {
    let total = 0;
    student.marks.forEach(m => total += m.score);
    return total;
}

students.forEach(s => {
    console.log(`${s.name} Total Marks: ${calculateTotal(s)}`);
});

function calculateAverage(student) {
    return calculateTotal(student) / student.marks.length;
}

students.forEach(s => {
    console.log(`${s.name} Average: ${calculateAverage(s).toFixed(2)}`);
});
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