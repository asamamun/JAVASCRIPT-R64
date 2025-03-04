class Human{
    hairColor = "black";
    skinColor = "white";
    constructor(name, age, gender, dob, weight, height){
        //this means the current object
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.dob = dob;
        this.weight = weight;
        this.height = height;        
    }
    //haircolor, skin color properties
    setHairColor(c){
        this.hairColor = c;
    }
    setSkinColor(c){
        this.skinColor = c;
    }

    draw(){
        //show the avatar in canvas
    }
}