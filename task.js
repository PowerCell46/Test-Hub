questions = [
    {id: 1},
    {id: 2},
    {id: 3}
]

const sortedquestions = questions.sort((a, b) => b.id - a.id)[0].id;

console.log(sortedquestions[0].id);