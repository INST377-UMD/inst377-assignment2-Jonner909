function startVoice() {
    if (annyang) {
      annyang.start();
    }
  }
  
  function stopVoice() {
    if (annyang) {
      annyang.abort();
    }
  }
  
  if (annyang) {
    const commands = {
      "hello": () => alert("Hello World"),
      "change the color to *color": color => document.body.style.backgroundColor = color,
      "navigate to *page": page => {
        const url = `${page.toLowerCase()}.html`;
        window.location.href = url;
      },
      "lookup *ticker": ticker => {
        const input = document.getElementById("ticker");
        if (input) {
          input.value = ticker.toUpperCase();
          getStockData();
        }
      },
      "load dog breed *breed": breed => {
        const buttons = document.querySelectorAll("#breed-buttons button");
        buttons.forEach(btn => {
          if (btn.textContent.toLowerCase() === breed.toLowerCase()) {
            btn.click();
          }
        });
      }
    };
    annyang.addCommands(commands);
  }