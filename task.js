class Person {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        return 'Hello there from ' + this.name
    }
}

const me = new Person("Peter");

console.log(me.sayHello());
