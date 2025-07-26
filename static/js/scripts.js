inventory = [];
let isFishing = false; // GLOBAL flag
let dabloons = 0; //player money
let caughtFishIds = new Set();
var waitamount1 = 3;
var waitamount2 = 5;
const music = document.getElementById('music');
const musicIcon = document.querySelector('.music-icon');
const musicPlayer = document.querySelector('.music-player');
const songpicker = document.getElementById('song');
const songlabel = document.getElementById('song-label');

const green_room_url = 'https://www.youtube.com/embed/GrCp8AHdgEM';
const third_sancuary = 'https://www.youtube.com/embed/7f1RK1m7qvc';
const hip_shop = 'https://www.youtube.com/embed/D83BxptHcRc';

music.addEventListener('load', () => {
    music.style.display = 'none';
    songpicker.style.display = 'none';
    songlabel.style.display = 'none';
});

musicPlayer.addEventListener('mouseover', () => {
    music.style.display = 'block';
    musicIcon.style.display = 'none';
    songpicker.style.display = 'block';
    songlabel.style.display = 'block';
});

musicPlayer.addEventListener('mouseout', () => {
    music.style.display = 'none';
    musicIcon.style.display = 'block';
    songpicker.style.display = 'none';
    songlabel.style.display = 'none';
});

function changeSong() {
    selectedSong = songpicker.value;
    switch (selectedSong) {
        case 'song1':
            music.src = green_room_url;
            break;
        case 'song2':
            music.src = the_world_revolving;
            break;
        case 'song3':
            music.src = third_sancuary;
            break;
        case 'song4':
            music.src = hip_shop;
            break;
    }
}

songpicker.addEventListener('change', changeSong);

function updateiframesize() {
    const maxWidth = 240;
    const maxHeight = 120;

    const newWidth = Math.min(musicPlayer.offsetWidth, maxWidth);
    const newHeight = Math.min(musicPlayer.offsetHeight, maxHeight);

    music.style.width = newWidth + 'px';
    music.style.height = newHeight + 'px';
}


setInterval(updateiframesize, 10);

const fishNames = [
  null, // index 0, unused
  "Progenetica",
  "Clownfish",
  "Blue tang",
  "Yellow tang",
  "Gem tang",
  "Sailfin tang",
  "Angelfish",
  "Queen angelfish",
  "French angelfish",
  "Goldfish",
  "Fighting fish",
  "Catfish",
  "Porcupinefish",
  "Spotted pufferfish",
  "Ocean sunfish",
  "Mahi mahi",
  "Roule’s goby",
  "Red piranha",
  "Lionfish",
  "Red scorpionfish",
  "Stonefish",
  "Flying fish",
  "Guppy",
  "Sailfin molly",
  "Greater weever",
  "Sockeye salmon",
  "Taimen",
  "Atlantic salmon",
  "Masu",
  "European angler",
  "Humpback anglerfish",
  "Hairy frogfish",
  "Common carp",
  "Tench",
  "Koi carp",
  "Barracuda",
  "Cardinal tetra",
  "Emperor tetra",
  "Zebrafish",
  "Petticoat tetra",
  "Perch",
  "Starry sturgeon",
  "Lake sturgeon",
  "Striped marlin",
  "Swordfish",
  "Garfish",
  "European pilchard",
  "Atlantic herring",
  "Blackspot seabream",
  "Silver seabream",
  "Atlantic cod",
  "Hake",
  "Bluefin tuna",
  "Pike",
  "Common barbel",
  "Tiger barb",
  "Cherry barb",
  "Opah",
  "Blue discus",
  "Rainbow trout",
  "Ribbon eel",
  "Giant moray eel",
  "European conger",
  "Harlequin snake eel",
  "Oarfish",
  "African coelacanth",
  "Longnose gar",
  "Saddled bichir",
  "Senegal bichir",
  "Turbot",
  "European seabass",
  "European anchovy",
  "Humphead wrasse",
  "Common stingray",
  "Shortfin mako shark",
  "River lamprey",
  "Racoon butterfish",
  "Atlantic trumpetfish",
  "Bartlett’s anthias",
  "Fire goby",
  "Atlantic spadefish",
  "Blue acara",
  "Oscar",
  "Dwarf Gourami",
  "Clown loach",
  "Arapaima",
  "Asian arowana",
  "Moorish idol",
  "Banggai cardinalfish",
  "Longhorn cowfish",
  "Hogfish",
  "Bluehead wrasse",
  "Lumpfish",
  "Boeseman’s rainbowfish",
  "Hillstream loach",
  "Seahorse",
  "Pacific oyster",
  "Pearl oyster",
  "Hard clam",
  "Giant clam",
  "Mediterranean mussel",
  "Great scallop",
  "Spiny cockle",
  "Mediterranean jelly",
  "Nomad jellyfish",
  "Portuguese man o’ war",
  "Common jellyfish",
  "Flame jellyfish",
  "Common octopus",
  "Flapjack octopus",
  "Atlantic giant squid",
  "Common squid",
  "Cushion star",
  "Common starfish",
  "Sea sponge",
  "Sea urchin",
  "Red king crab",
  "Common Hermit crab",
  "Blue crab",
  "Yeti crab",
  "Atlantic horseshoe crab",
  "Atlantic crayfish",
  "Common lobster",
  "Spiny lobster",
  "Shrimp",
  "Green sea turtle",
  "Axolotl",
  "Chambered nautilus",
  "Goose barnacle",
  "Blue sea dragon",
  "Sea butterfly",
  "Giant cuttlefish",
  "Sea cucumber",
  "Common sea slug",
  "Emerald sea slug",
  "Leaf slug",
  "Sea bunny",
  "Giant isopod",
  "Queen conch",
  "Purple cone snail",
  "Fireworm",
  "Bonelia",
  "Planaria",
  "Medicinal leech"
];

const fishData = fishNames.map((name, index) => {
  if (!name) return null; // Skip index 0

  let rarity;
  let basePrice;
  let weight;

  // Example rarity tier logic
  if (index === 130) { // Blue sea dragon = rarest
    rarity = "legendary";
    basePrice = 10000;
    weight = 0.1;
  } else if (index <= 10) {
    rarity = "common";
    basePrice = 50;
    weight = 10;
  } else if (index <= 30) {
    rarity = "uncommon";
    basePrice = 150;
    weight = 7;
  } else if (index <= 60) {
    rarity = "rare";
    basePrice = 300;
    weight = 4;
  } else if (index <= 100) {
    rarity = "epic";
    basePrice = 800;
    weight = 1.5;
  } else {
    rarity = "mythic";
    basePrice = 2500;
    weight = 0.5;
  }

  return {
    id: index,
    name,
    image: `static/img/fishes/fish${index}.png`,
    rarity,
    basePrice,
    weight,
  };
}).filter(Boolean); // Remove nulls

const fishVariants = [
    { name: "Shiny", rarity: "common", chance: 0.1, bonusMultiplier: 1.2 },
    { name: "Golden", rarity: "uncommon", chance: 0.05, bonusMultiplier: 1.5 },
    { name: "Shadow", rarity: "rare", chance: 0.02, bonusMultiplier: 2 },
    { name: "Polychrome", rarity: "epic", chance: 0.005, bonusMultiplier: 3 },
    { name: "Radiant", rarity: "legendary", chance: 0.001, bonusMultiplier: 5 },
];

const achievements = [
  {
    id: "firstFish",
    name: "First Catch!",
    description: "Catch your first fish.",
    unlocked: false
  },
  {
    id: "rich",
    name: "Getting Rich",
    description: "Earn 1000 dabloons.",
    unlocked: false
  },
  {
    id: "hundredaire",
    name: "Dabloon Collector",
    description: "Hold 100 dabloons at once.",
    unlocked: false
  },
  {
    id: "fish5",
    name: "Gone Fishing",
    description: "Catch 5 fish.",
    unlocked: false
  },
  {
    id: "fish20",
    name: "Line Veteran",
    description: "Catch 20 fish.",
    unlocked: false
  },
  {
    id: "fish50",
    name: "Master Angler",
    description: "Catch 50 fish.",
    unlocked: false
  },
  {
    id: "goldCatch",
    name: "Golden Glimmer",
    description: "Catch a Gold variant fish.",
    unlocked: false
  },
  {
    id: "shadowCatch",
    name: "Shadow Lurker",
    description: "Catch a Shadow variant fish.",
    unlocked: false
  },
  {
    id: "radiantCatch",
    name: "Shine Bright",
    description: "Catch a Radiant variant fish.",
    unlocked: false
  },
  {
    id: "sellFirst",
    name: "Merchant Life",
    description: "Sell your first fish.",
    unlocked: false
  },
  {
    id: "sellAll",
    name: "Clean Slate",
    description: "Use the Sell All button once.",
    unlocked: false
  },
  {
    id: "inventoryFull",
    name: "Too Many Fish",
    description: "Have 20 fish in your inventory at once.",
    unlocked: false
  },
  {
    id: "cast100",
    name: "Addicted to Casting",
    description: "Cast your line 100 times.",
    unlocked: false
  },
  {
    id: "luckyRoll",
    name: "Lucky Duck",
    description: "Catch a variant fish with under 5% chance.",
    unlocked: false
  },
  {
    id: "legendaryCombo",
    name: "Epic Haul",
    description: "Catch a Radiant variant of a rare fish.",
    unlocked: false
  },
  {
    id: "noSell10",
    name: "Collector",
    description: "Catch 10 fish without selling any.",
    unlocked: false
  },
  {
    id: "fastClicker",
    name: "Speed Demon",
    description: "Try to fish again before the timer ends.",
    unlocked: false
  },
  {
    id: "shinyDex",
    name: "Variant Hunter",
    description: "Catch one of each variant type.",
    unlocked: false
  },
  {
    id: "dedicated",
    name: "Fishing Forever",
    description: "Play for 1 hour total.",
    unlocked: false
  }
];

function showwarning() {
    Swal.fire({
        title: 'Welcome!',
        text: 'Hello! This is my cool game made entirely from html, css, and javascript. This game can save properly hopefully if im not lazy I will make a saving system with like a txt file. So your data does NOT save so dont get angry ok.',
        icon: 'warning',
        confirmButtonText: 'ok i understand'
    });
}

//function catchFish(fishId) {
 // const name = fishNames[fishId];
  //const image = `static/img/fishes/fish${fishId}.png`;
  //const fisharea = document.getElementById("caughtcontent");
//
  //const fishElement = document.createElement("div");
  //fishElement.innerHTML = `
    //<img src="${image}" alt="${name}" style="width:100px;height:auto;">
    //<p>${name}</p>
  //`;
  //fisharea.appendChild(fishElement);
//}

// catchFish(22)

document.addEventListener("DOMContentLoaded", function() {
    var iui = document.getElementById("inventoryui");
    var openBtn = document.getElementById("inventorybutton");
    var closeBtn = document.getElementById("inventoryuiclose");

    openBtn.onclick = function() {
        iui.style.display = "block";
        const inventoryList = document.getElementById("inventoryList");

        // Clear the list before adding new items (optional)
        inventoryList.innerHTML = "";

        for (let i in inventory) {
            const iElement = document.createElement("li");
            const item = inventory[i];
            let display = `${item.name} (${item.rarity}) - $${item.basePrice}`;
            if (item.variant) {
                display += ` [${item.variant}]`;
            }
            iElement.textContent = display;

            inventoryList.appendChild(iElement);
        }
        closeBtn.onclick = function() {
            iui.style.display = "none";
        }

      window.onclick = function(event) {
        if (event.target == iui) {
            iui.style.display = "none";
        }
    }
    };

    closeBtn.onclick = function() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
});

function getRandomFish() {
  const totalWeight = fishData.reduce((sum, fish) => sum + fish.weight, 0);
  let rand = Math.random() * totalWeight;

  for (const fish of fishData) {
    rand -= fish.weight;
    if (rand <= 0) return fish;
  }
  return fishData[fishData.length - 1]; // Fallback
}

function applyRandomVariant(fish) {
    for (const variant of fishVariants) {
        if (Math.random() < variant.chance) {
            fish.variant = variant.name;
            fish.variantRarity = variant.rarity;
            fish.basePrice = Math.floor(fish.basePrice * variant.bonusMultiplier);
            return;
        }
    }
    fish.variant = null;
}


function catchRandomFish() {
  const fish = getRandomFish();
  applyRandomVariant(fish);
    inventory.push({
    name: fish.name,
    rarity: fish.rarity,
    basePrice: fish.basePrice,
    variant: fish.variant || null
  });
  caughtFishIds.add(fish.name); // or fish.id if you prefer

  incrementCaughtFish();
  incrementNoSellFish();
  incrementCastCount();

  // Catch 5, 20, 50 fish
  if (achievements._fishCaught === 5) unlockAchievement("fish5");
  if (achievements._fishCaught === 20) unlockAchievement("fish20");
  if (achievements._fishCaught === 50) unlockAchievement("fish50");

  // Inventory full (20 fish)
  if (inventory.length >= 20) unlockAchievement("inventoryFull");

  // No sell 10
  if (achievements._noSellFish === 10) unlockAchievement("noSell10");

  // Cast 100 times
  if (achievements._castCount === 100) unlockAchievement("cast100");

  // Variant achievements
  if (fish.variant === "Golden") unlockAchievement("goldCatch");
  if (fish.variant === "Shadow") unlockAchievement("shadowCatch");
  if (fish.variant === "Radiant") unlockAchievement("radiantCatch");

  // Lucky roll (<5% chance)
  if (fish.variant && fishVariants.find(v => v.name === fish.variant && v.chance < 0.05)) {
    unlockAchievement("luckyRoll");
  }

  // Legendary combo
  if (fish.variant === "Radiant" && (fish.rarity === "rare" || fish.rarity === "epic" || fish.rarity === "mythic")) {
    unlockAchievement("legendaryCombo");
  }

  // ShinyDex (one of each variant)
  if (fish.variant) {
    const variants = getUniqueVariantsCaught();
    variants[fish.variant] = true;
    if (["Shiny", "Golden", "Shadow", "Polychrome", "Radiant"].every(v => variants[v])) {
      unlockAchievement("shinyDex");
    }
  }

  // Unlock first fish achievement
  if (!achievements.find(a => a.id === "firstFish").unlocked) {
    unlockAchievement("firstFish");
  }

  const fishimg = document.getElementById("caughtfish").src = fish.image;
  const fishname = document.getElementById("fishname");
  const fishrarity = document.getElementById("fishrarity");
  const fishprice = document.getElementById("fishprice");

  if (fish.variant) {
    fishname.textContent = `${fish.name} (${fish.variant})`
  }
  else{
    fishname.textContent = fish.name
  }

  fishrarity.textContent = fish.rarity
  if (fish.rarity == "uncommon"){
    fishrarity.style = "color: grey;"
  }
  else if (fish.rarity == "common"){
    fishrarity.style = "color: green;"
  }
  else if (fish.rarity == "rare"){
    fishrarity.style = "color: blue;"
  }
  else if (fish.rarity == "epic"){
    fishrarity.style = "color: purple;"
  }
  else if (fish.rarity == "mythic"){
    fishrarity.style = "color: pink;"
  }
  else { 
    fishrarity.style = "color: yellow;"
  }

  fishprice.textContent = `$${fish.basePrice}`
}

function fish() {
    const fishb = document.getElementById("castbutton");

    if (isFishing) {
        console.log("Already fishing...");
        return; // Don't fish again until the timer is done
    }

    isFishing = true;
    fishb.textContent = "Fishing... wait for a bite";
    var castuiu = document.getElementById("castui");
    var closeBtn = document.getElementById("castclose");


    const randomwait = Math.floor(Math.random() * (waitamount2 - waitamount1 + 1)) + waitamount1;

    setTimeout(() => {
        console.log("fish caught");
        fishb.textContent = "Cast";
        isFishing = false; // Reset flag after done
        catchRandomFish();
        castuiu.style.display = "block";
        closeBtn.onclick = function() {
            castuiu.style.display = "none";
        }
        window.onclick = function(event) {
        if (event.target == castuiu) {
            castuiu.style.display = "none";
        }
    }
        
    }, randomwait * 1000);
}

function opencastui(){
    openBtn.onclick = function() {
        popup.style.display = "block";
    };

    closeBtn.onclick = function() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
};

function openSellUI() {
    document.getElementById("sellAllButton").onclick = sellAllFish;
    document.getElementById("sellclose").onclick = () => {
        document.getElementById("sellui").style.display = "none";
    };

    const selluii = document.getElementById("sellui");

    window.onclick = function(event) {
          if (event.target == selluii) {
              selluii.style.display = "none";
          }
      }

    const fishSellList = document.getElementById("fishSellList");
    fishSellList.innerHTML = "";

    let total = 0;

    inventory.forEach((fish, index) => {
        const item = document.createElement("div");
        const variantText = fish.variant ? ` [${fish.variant}]` : "";
        const price = getSellPrice(fish);

        const fishInfo = document.createElement("span");
        fishInfo.textContent = `${fish.name}${variantText} - $${price} `;

        const sellButton = document.createElement("button");
        sellButton.textContent = "Sell";
        sellButton.addEventListener("click", () => sellFish(index));

        item.appendChild(fishInfo);
        item.appendChild(sellButton);
        fishSellList.appendChild(item);

        total += price;
    });

    document.getElementById("totalValue").textContent = `Total: $${total}`;
    document.getElementById("sellui").style.display = "block";
}


function getSellPrice(fish) {
  let price = fish.basePrice;
  if (fish.variant) {
    // Bonus value for special variants
    if (fish.variant === "Gold") price *= 2;
    else if (fish.variant === "Shadow") price *= 1.5;
    else if (fish.variant === "Radiant") price *= 3;
    else price *= 1.2; // Default for other variants
  }
  return Math.floor(price);
}

function sellFish(index) {
  const fish = inventory[index];
  const price = getSellPrice(fish);
  dabloons += price;
  if (dabloons >= 1000) unlockAchievement("rich");
  document.getElementById("dabloonsAmount").textContent = dabloons;
  inventory.splice(index, 1);
  openSellUI(); // Refresh list
}

function sellAllFish() {
  let total = 0;
  inventory.forEach(fish => {
    total += getSellPrice(fish);
  });
  dabloons += total;
  if (dabloons >= 1000) unlockAchievement("rich");
  document.getElementById("dabloonsAmount").textContent = dabloons;
  inventory = [];
  openSellUI(); // Refresh
}

function unlockAchievement(id) {
  const achievement = achievements.find(a => a.id === id);
  if (achievement && !achievement.unlocked) {
    achievement.unlocked = true;
    showAchievementPopup(achievement);
    updateAchievementUI(); 
  }
}


function showAchievementPopup(achievement) {
  const popup = document.createElement("div");
  popup.className = "achievement-popup";
  popup.innerHTML = `
    <strong>🏆 ${achievement.name}</strong><br>
    <span>${achievement.description}</span>
  `;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 4000);
}

function updateAchievementUI() {
  const list = document.getElementById("achievementList");
  list.innerHTML = "";
  achievements.forEach(a => {
    const div = document.createElement("div");
    div.textContent = `${a.unlocked ? "✅" : "❌"} ${a.name} - ${a.description}`;
    list.appendChild(div);
  });
}

document.getElementById("sellbutton").onclick = openSellUI;

document.addEventListener("DOMContentLoaded", function() {
    const achiveui = document.getElementById("achievementui");
    const closeBtn = document.getElementById("achievementClose");
    const achievementbutton = document.getElementById("achievementbutton");

    if (achiveui && closeBtn && achievementbutton) {
        achiveui.style.display = "none";

        achievementbutton.onclick = function() {
            achiveui.style.display = "block";

        }

        closeBtn.onclick = function() {
            achiveui.style.display = "none";
        }

        window.onclick = function(event) {
          if (event.target == achiveui) {
              achiveui.style.display = "none";
          }
      }
    }
    updateAchievementUI();
});

function countCaughtFish() {
  return achievements._fishCaught = (achievements._fishCaught || 0);
}
function incrementCaughtFish() {
  achievements._fishCaught = (achievements._fishCaught || 0) + 1;
  return achievements._fishCaught;
}
function countNoSellFish() {
  return achievements._noSellFish = (achievements._noSellFish || 0);
}
function incrementNoSellFish() {
  achievements._noSellFish = (achievements._noSellFish || 0) + 1;
  return achievements._noSellFish;
}
function incrementCastCount() {
  achievements._castCount = (achievements._castCount || 0) + 1;
  return achievements._castCount;
}
function getUniqueVariantsCaught() {
  achievements._variantsCaught = achievements._variantsCaught || {};
  return achievements._variantsCaught;
}

// Playtime (dedicated)
setInterval(() => {
  achievements._playSeconds = (achievements._playSeconds || 0) + 1;
  if (achievements._playSeconds >= 3600) unlockAchievement("dedicated");
}, 1000);

document.getElementById("fishindex").onclick = function() {
    const fishIndexUI = document.getElementById("fishindexui");
    const fishIndexList = document.getElementById("fishIndexList");
    fishIndexList.innerHTML = ""; // Clear previous entries

    fishData.forEach(fish => {
        const li = document.createElement("li");
        // Check if this fish has been caught
        const isCaught = caughtFishIds.has(fish.name); // or fish.id if you used id above
        if (isCaught) {
            li.innerHTML = `<img src="${fish.image}" alt="${fish.name}" style="width:50px;height:auto;"> ${fish.name} (${fish.rarity}) - $${fish.basePrice}`;
        } else {
            li.innerHTML = `<img src="static/img/mysteryfish.png" alt="???" style="width:50px;height:auto;"> ??? (???) - $???`;
        }
        fishIndexList.appendChild(li);
    });

    fishIndexUI.style.display = "block";

    document.getElementById("fishindexclose").onclick = function() {
        fishIndexUI.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == fishIndexUI) {
            fishIndexUI.style.display = "none";
        }
    }
}


document.getElementById("shopbutton").onclick = function () {
    const shopUI = document.getElementById("shopui");
    const shopclose = document.getElementById("shopclose");

    console.log("Shop button clicked");

    if (shopUI && shopclose) {
        shopUI.style.display = "block";

        // Close button logic (only assign once)
        shopclose.onclick = function () {
            shopUI.style.display = "none";
            console.log("Shop closed");
        };
    }
    window.onclick = function(event) {
        if (event.target == shopUI) {
            shopUI.style.display = "none";
        }
    }
};

window.onload = function(){
  const checkboxt = document.getElementById("autocastCheckbox");
  const checkboxtext = document.getElementById("checktext");

  checkboxt.style.display = "none"
  checkboxtext.style.display = "none"
  let autobought = false;
}

let breelbought = false;

function buybetterreel(){
  const buttonthing = document.getElementById("reelbuy");

  if (!breelbought && dabloons >= 10000){
    breelbought = true;
    dabloons -= 10000;
    document.getElementById("dabloonsAmount").textContent = dabloons;
    buttonthing.textContent = "Bought"
    waitamount1 = 1;
    waitamount2 = 2;
  }
  else{
    alert("You already bought this... or your broke")
  }
}

document.getElementById("help").onclick = function () {
    const shopUI = document.getElementById("helpui");
    const shopclose = document.getElementById("helpclose");

    if (shopUI && shopclose) {
        shopUI.style.display = "block";

        // Close button logic (only assign once)
        shopclose.onclick = function () {
            shopUI.style.display = "none";
        };
    }
      window.onclick = function(event) {
        if (event.target == shopUI) {
            shopUI.style.display = "none";
        }
    }
};
