function setDatetimeNow() {
    // For todays date;
    Date.prototype.today = function() {
        return this.getFullYear() + "-" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "-" + ((this.getDate() < 10) ? "0" : "") + this.getDate();
    }

    // For the time now
    Date.prototype.timeNow = function() {
        return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes();
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    var datetime = new Date().today() + "T" + new Date().timeNow();
    const event = new Date(datetime);
    var dateControl = document.querySelector('input[type="datetime-local"]');
    dateControl.value = datetime; // définir la valeur comme la date actuelle 
    dateControl.min = new Date().today() + "T00:00";
    console.log(event.addDays(7).toISOString().slice(0, -8)); // ajouter 7 jours puis retirer les secondes et ms
    dateControl.max = event.addDays(7).toISOString().slice(0, -8); // définir le temps max dans le calendrier
    //document.getElementById("datetimeNow").innerHTML = datetime;
}