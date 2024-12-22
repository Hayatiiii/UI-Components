
const not = document.querySelector('.not');
const nbox = document.querySelector('.nbox');
const notcon=document.querySelector('.body');
const icon=document.querySelector('.icon');

const editt=document.querySelector('.edit');
const subj= document.querySelector('#ti');
const bodyte=document.querySelector('#body');
const added=document.querySelector('.ad');
const addn = document.querySelector('.addnot')
const newtext=document.querySelector('#new');
const newt=document.querySelector('.new');


const hea = '♥️';
const th = '👍🏻';
const ha = '🤝🏻';


var sub , body, time,emoji;
var len=false;



icon.addEventListener('mouseover',()=>
    {
          nbox.style.display="flex";
          if(!len)
          {
          
          sheet.deleteRule(0);
          len=true;
          }
          
    });


const s = document.createElement('style');
document.head.appendChild(s);
const sheet = s.sheet;
true





added.addEventListener('click',()=>
    {
        
        if(!subj.value && !bodyte.value)
        {
           console.warn("title and body are required ");
           return;
        }
        
         sub=subj.value;
        body=bodyte.value;        
        time=new Date;
        
        addnot(sub,body,time);
        
        
        
       subj.value="";
       bodyte.value="";
        
        
    });




function addnot(sub,body,time)
{


const nott={
    
    sub,
    body,
    time:Date.now(),
};

const noti=JSON.parse(localStorage.getItem('not')) || [];
noti.push(nott);
localStorage.setItem('not',JSON.stringify(noti));

const notifi=get();

display(notifi);
       
        
        }
    

function get()
{
    return JSON.parse(localStorage.getItem('not')) || [];
    
   
}



function relevent(time)
{
    const ne = new Date();
    const diff = ne - time; 
    const sec = Math.floor(diff / 1000); 
    const min = Math.floor(sec / 60);
     const hrs = Math.floor(min / 60);
      const day = Math.floor(hrs / 24); 
      
      if (day > 0) 
      { return `${day} day${day > 1 ? "s" : ""} ago`;
      
       }
       else if (hrs > 0) 
       { return `${hrs} hr${hrs > 1 ? "s" : ""} ago`; 
       
       }
        else if (min > 0) 
        { 
        return `${min} min${min > 1 ? "s" : ""} ago`; }
        
         else
         { return "just now"; 
         
         }
}



function closedit()
{
    editt.style.display="none";
}

addn.addEventListener('click',()=>
    {
        
   

    editt.style.display="flex";
    
});


function set(em,div) {
    emoji = em;
    div.style.setProperty('--emoji', `"${emoji}"`);

  
    if (sheet.cssRules.length > 0) {
        sheet.deleteRule(0);
    }

   
    sheet.insertRule(
        `.not::before {
            content: var(--emoji);
            height: 20px;
            width: 20px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 5px;
            bottom: -12px;
            border-radius: 50%;
            border: 1px solid #f5f5f5;
            transition:all 0.3s ease;
            
        }`,
        0
    );

    div.querySelector('.emojicon').style.display = "none";
    
}





function remove(notiff,ind)
{
   
         
 notiff.splice(ind,1);    
  
  
  if(notiff.length==0)
  {
      newt.style.display="none";
  }
  else
  {
      newtext.innerHTML=notiff.length; 
  }
 
      
}




function display(notifi)
{

    


notcon.innerHTML="";
       
       
    
    notifi.forEach((n,index)=>
    {
    
   const div=document.createElement('div');
       div.className="not";
       
       if(n.sub!="" && n.body!="")
       {
          
       
       div.innerHTML=`
       
       
           
                    
                    <div class="notleft">
                    <div class="h">
                        <p id="title">${n.sub}</p>•
                        <p id="time">${relevent(n.time)}</p>
                    </div>
                    <div class="nbody">
                        ${n.body}
                    </div>
                    </div>
                    
                    <div class="notright">
                        
                        <div class="emoji">
                            👍🏻
                        </div>
                        <div class="closenot" data="${index}">
                            <i class='bx bx-x' ></i>
                        
                      </div>
                      
                    <div class="emojicon">
                         
                    <div class="thumb">👍🏻</div>
                    <div class="heart">♥️</div>
                    <div class="hand">🤝🏻</div>
                                             
                   </div>
                        
                    </div>
                    
               
                
       
       `;
       
      } 
     
       
       
       
            
     
            
    notcon.addEventListener('click', (e) => {
    if (e.target.closest('.closenot')) {
        const div = e.target.closest('.not');
        const ind = e.target.closest('.closenot').getAttribute('data');

        const notiff = get();
       
        remove(notiff, ind);
        localStorage.setItem('not', JSON.stringify(notiff));

        div.style.display = "none";
    }
});

    
       
 //    icon.style.setProperty('--length', notifi.length);

if (sheet.cssRules.length > 0) {
    sheet.deleteRule(0);
}

sheet.insertRule(`
    .icon::after {
        content: '${notifi.length}';
        height: 20px;
        width: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: blue;
        color: #fff;
        position: absolute;
        right: -2px;
        top: -4px;
        animation: fl 2s ease-in infinite;
    }
`, 0);

      newt.style.display="flex";
      newtext.innerHTML=notifi.length;
      
       
       notcon.addEventListener('click', (e) => {
    
    const emojiBtn = e.target.closest('.emoji');
    if (emojiBtn) {
        const div = emojiBtn.closest('.not');
        div.querySelector('.emojicon').style.display = "flex";
    }

    
    const heartBtn = e.target.closest('.heart');
    if (heartBtn) {
        const div = heartBtn.closest('.not');
        set(hea, div);
    }

    
    const thumbBtn = e.target.closest('.thumb');
    if (thumbBtn) {
        const div = thumbBtn.closest('.not');
        set(th, div);
    }

    
    const handBtn = e.target.closest('.hand');
    if (handBtn) {
        const div = handBtn.closest('.not');
        set(ha, div);
    }
});

        
        notcon.appendChild(div);
        
        
   
         });     
       
       
}


function clearall()
{
    localStorage.clear();
    notcon.innerHTML="";
    newt.style.display="none";
    
}


document.addEventListener("DOMContentLoaded", () => {
    const notifi = get(); 
    display(notifi); 
    realtime(); 
});

function realtime() {
    setInterval(() => {
        const notifi = get(); 
        display(notifi); 
    }, 60000); 
}
