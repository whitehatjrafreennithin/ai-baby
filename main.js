status = "";
objects = []

function preload(){
    song = loadSound("alarm_alarm_alarm.mp3")
}

function setup() {
    canvas = createCanvas(650, 420);
    canvas.center()
    video = createCapture(VIDEO);
    video.hide();


    objectDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting";
}

function modelLoaded() {
    console.log("Modelloaded");
    status = true;

}



function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    if (results) {
        console.log(results)
        objects = results

    }
}


function draw() {

    image(video, 0, 0, 650, 420);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetect.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            objectDetect.detect(video, gotResult);
            document.getElementById("status").innerHTML = "Status: Object Detected"
            percent = floor(objects[i].confidence * 100);
            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill()
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("baby_found_notfound").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }else{
                document.getElementById("baby_found_notfound").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }
            if (objects.length == 0) {
                document.getElementById("baby_found_notfound").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }
        }


    }
}