function skillsMember() {
    var skills = ["HTML", "CSS", "JS", "PHP"];
    var member = {
        name: "John",
        age: 30,
        skills: skills,
        address: {
            street: "123 Main St.",
            city: "Boston"
        },
        getSkills: function() {
            return this.skills;
        }
    };
    return member;
}