import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCount'
})
export class DateCountPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;

  transform(value: string): any{  
    let myString:string = value+''
    let takeYear:string = '', takeMonth:string = '', takeDay:string = '';
    for(var i=0;i<11;i++){
      if(i<4){
        takeYear = takeYear+myString.charAt(i)
      }
      if(i>4 && i <7){
        takeMonth = takeMonth+myString.charAt(i);
      }
      if(i>7 && i<10){
        takeDay = takeDay+myString.charAt(i);
      }
    }
    let newValue:any = new Date(parseInt(takeYear),parseInt(takeMonth)-1,parseInt(takeDay))
    let today:Date = new Date (); //get current date and time
    let todayWithNoTime:any = new Date(today.getFullYear(),today.getMonth(), today.getDate())
    var dateDifference= todayWithNoTime-newValue //returns value in milliseconds
    const secondsInADay=86400; //60 sec*60 min in an hr * 24 hrs

    var dateDifferenceSeconds=dateDifference*0.001; //converts to seconds

    var dateCounter = dateDifferenceSeconds/secondsInADay;
    console.log(dateCounter);

    if (dateCounter >=1){
      return Math.round(dateCounter);
    }else{
      return 0;
    }

  }

}
