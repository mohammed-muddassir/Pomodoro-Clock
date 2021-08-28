function App(){
    const [session,setSession]=React.useState(1500)
    const [breakTime,setbreak]=React.useState(300);
    const [sessionTime,setStime]=React.useState(1500);
    const [timer,settimer]=React.useState(false);
    const [onbreak,setonbreak]=React.useState(false);
    const [title,settitle]=React.useState('Session');
    const [audio,setAudio]=React.useState(new Audio('https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/121%20to%20130%20bpm/334[kb]125_lo-squeaky-beep.wav.mp3'));
    
    const play=()=>{
        audio.currentTime=0;
        audio.play();
    }
    const display=(value)=>{
      var minute=value/60;
      var alter=Math.floor(minute);;
      return alter;
      
      
    }
    const displaytime=(session)=>{
         var min
        let minutes=session/60;
        let seconds=session%60;
      
        min=minutes<10?"0"+Math.floor(minutes):Math.floor(minutes);
       
        let sec=seconds<10?"0"+seconds:seconds;
        return min+":"+sec;
    }
    const reduceFunc=(amount,type,red)=>{
           if(timer){
             return
           }
      else{
        if(type==='session' ){
               if(sessionTime<=60 &&amount<0) {
                   return}
              if(sessionTime>=3600 &&amount>0) return;
                   
               setStime(sessionTime+amount)
               setSession(sessionTime+amount)
           }
           else if(type==='breake'){
                 if(breakTime<=60 &&amount<-59) return
                   if(breakTime>=3600 &&amount>0) return;
               setbreak(breakTime+amount)
           }
      }
          
    }
    const timefunc=()=>{
        let second=1000;
        let d=new Date().getTime();
        let newTime=d+second;
        let onbrkvar=onbreak;
        if(!timer){
            let interval=setInterval(()=>{
                d=new Date().getTime();
                if(d>newTime){
                    setStime(prevState=>{

                        if(prevState<=0 && !onbrkvar){
                            play();
                            onbrkvar=true
                            setonbreak(true);    
                            return breakTime
                                
                        }
                        else if(prevState<=0 && onbrkvar){
                            play();
                            onbrkvar=false
                            setonbreak(false)
                            return session
                        }
                        return prevState-1;
                    })
                    newTime+=second;
                }
    
            },1000)
            localStorage.clear();
            localStorage.setItem("id",interval);
        }
        if(timer){
            clearInterval(localStorage.getItem("id"))
        }
        settimer(!timer)

    }
    const resetFunc=()=>{
        setStime(1500);
        setbreak(300);
        setSession(1500);
       settimer(false)
      timefunc();
    }
    return (
        <div id="container">
              
              
              <div id="length">
                  <Length type="breake" 
                  value={breakTime}
                  idName="break-label"
                  incfunc={reduceFunc}
                  incId="fa fa-angle-double-up"
                  decId="fa fa-angle-double-down"
                  decfunc={reduceFunc}
                    lengthId="break-length"
                    label="Break Length"
                  />
                  <Length type="session"
                   value={session}
                   idName="session-label"
                   incId="fa fa-angle-double-up"
                   decId="fa fa-angle-double-down"
                    lengthId="session-length"
                   incfunc={reduceFunc}
                   decfunc={reduceFunc}
                    label="Session Length"
                   
                   />
                  

              </div>
              <audio id="beep" src={audio}></audio>
             <div id="label-container">
                <div id="label">
                    <h1 id="timer-label"  >Session</h1>
                
                    <p id="time-left"  >{displaytime(sessionTime)}</p>
                </div>
                <div id="toggle" >
                <i className="fa fa-play-circle"  onClick={timefunc}>{timer?'Pause':'Play'}</i>
                 <i className="fa fa-refresh"  onClick={resetFunc}>Reset</i>
                </div>
             </div>
             <div>
               <a id="profile"  href="https://twitter.com/muddassir0_0">By muddassir</a>
             </div>

        </div>
        
        );

        function Length({value,incfunc,decfunc,type,idName,incId,decId,label,lengthId}){
            return(
                <div id="session-break" >
                
                <p id={idName}>{label}</p>
                <div id="change">
                <i onClick={()=>decfunc(-60,type)} className={decId}></i>
                <p id={lengthId}>{display(value)}</p>
                <i onClick={()=>incfunc(60,type)} className={incId}></i>
                </div>
                </div>
            )
        };

}

ReactDOM.render(<App/>,document.getElementById("root"));