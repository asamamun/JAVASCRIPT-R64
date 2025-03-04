class TV{
    size=50;
    color="black";    
    power = false;
    channel=0;
    volume=50;    
    //methods
    turnOn(){
        this.power = true;
        console.log("TV is on");
    }
    turnOff(){
        this.power = false;
        console.log("TV is off");
    }
    volumeUp(){
        this.volume++;
        console.log("Volume is increased");
    }
    volumeDown(){
        this.volume--;
        console.log("Volume is decreased");
    }
    changeChannel(num){
        this.channel = num;
        console.log("Channel is changed");
    }
    displayContent(v){
        console.log(v);
    }

}