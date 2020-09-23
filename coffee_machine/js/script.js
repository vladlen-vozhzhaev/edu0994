let money = document.getElementById("money");
      let display = document.getElementById("display");
      let bills = document.querySelectorAll("img[src$='rub.jpg']");
      let bill_acc = document.getElementById("bill_acc");
      let displayInfo = document.getElementById("displayInfo");
      let balance = document.getElementById("balance");
      let change_box = document.getElementById("change_box");
      let progressBar = document.querySelector(".progress-bar");
      let coffe_mug = document.getElementById("coffe_mug");
      let blocker = document.getElementById("blocker");
      for(let i=0; i<bills.length; i++){
        bills[i].onmousedown = function(event){
          let bill = bills[i];
          bill.style.position = "absolute";
          bill.style.zIndex=1;
          bill.style.transform = "rotate(90deg)";
          moveAt(event)
          
          function moveAt(e){
            bill.style.left = (e.clientX - bill.width/2) + "px";
            bill.style.top = (e.clientY - bill.height/2) + "px";
          }
          
          document.addEventListener("mousemove",moveAt);
          
          document.onmouseup = function(){
            document.removeEventListener("mousemove",moveAt);
            bill.style.zIndex=0;
            
            let bill_top = bill.getBoundingClientRect().top;
            let bill_right=bill.getBoundingClientRect().right;
            let bill_left= bill.getBoundingClientRect().left;
            
            let bill_acc_top = bill_acc.getBoundingClientRect().top;
            let bill_acc_right=bill_acc.getBoundingClientRect().right;
            let bill_acc_left= bill_acc.getBoundingClientRect().left;
            let bill_acc_bottom=bill_acc.getBoundingClientRect().bottom - (bill_acc.height/3)*2;
            
            if (bill_top>bill_acc_top && bill_right<bill_acc_right && bill_left>bill_acc_left && bill_top<bill_acc_bottom){
              bill.hidden = true;
              money.value = +money.value + +bill.dataset.denomination;
              balance.innerText = "Ваш баланс: "+money.value+"руб.";
              let audio = new Audio("../audio/bankomat.mp3").play();
              audio.play();
            }
          }
          
          bill.ondragstart = function(){return false;}
        }
      }
      
      coffe_mug.onclick = function(){
        if (this.style.opacity!=0){
          this.style.opacity = 0;
          let audio = new Audio("../audio/09024.mp3");
          audio.play();
        }
      }
      
      function getCoffee(coffeeName,cost){
        if (money.value >= cost){
          blocker.style.height = window.innerHeight+"px";
          money.value -= cost;
          balance.innerText = "Ваш баланс: "+money.value+"руб.";
          let w = 0;
          progressBar.hidden = false;
          let timerId = setInterval(function(){
            progressBar.style.width = (++w)+"%";
            coffe_mug.style.opacity = w/100;
            if (w==105){
              progressBar.hidden = true;
              progressBar.style.width = "0%";
              displayInfo.innerText = `Кофе ${coffeeName} готов!`;
              blocker.style.height = 0+"px";
              clearInterval(timerId);
            }else if (w<40){
              displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> ожидайте...`;
            }else if (w<75){
              displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> ожидайте...`;
            }else{
              displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i> ожидайте...`;
            }
          },100);
          
          let audio = new Audio("../audio/get_coffee.mp3").play();
          audio.play();
        }
        else
          displayInfo.innerText = "Нет денег - нет кофе!";
      }
      
      function getChange(num,isRecursion=false){
        money.value = 0;
        balance.innerText = "Ваш баланс: "+0+"руб.";
        let coin = 0;
        let top = getRandom(0, change_box.offsetHeight-64);
        let left= getRandom(0, change_box.offsetWidth-64);
        if (num>=10) coin = 10;
        else if(num>=5) coin=5;
        else if(num>=2) coin=2;
        else if(num>=1) coin=1;
        
        if (coin>0){
          change_box.innerHTML += `<img onclick="this.hidden=true" src="../img/${coin}rub.png" style="top:${top}px; left:${left}px;">`;
          getChange(num-coin,true);
        }else if (isRecursion){
          let audio = new Audio("../audio/get_change.mp3").play();
          audio.play();
        }
      }

      function getRandom(min,max){
        return Math.random()*(max-min)+min;
      }