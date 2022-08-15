// Javasript Frame Size (for ideal weight range) Calculator    

// nav burger
const containerBurger = document.querySelector(".container-burger");
const containerBurgerRotate = document.querySelector(".container-burger-rotate");
const navControl = document.querySelector("#nav-control");
containerBurger.addEventListener("click", function(){
	containerBurgerRotate.classList.toggle("burger-rotate");
	navControl.classList.toggle("nav-collapse");
	navControl.classList.toggle("transition");
	setTimeout(() => {
		containerBurgerRotate.classList.toggle("toggle-x");
		containerBurgerRotate.classList.toggle("toggle-color");
	}, 500);
});
window.addEventListener('resize', function(event){
    var newWidth = window.innerWidth;
    // var newHeight = window.innerHeight; 
	if(newWidth >= 768){
		if(navControl.classList.contains("nav-collapse")){
			navControl.classList.toggle("nav-collapse");
			navControl.classList.toggle("transition");
		};
		containerBurgerRotate.classList.toggle("burger-rotate");
		containerBurgerRotate.classList.toggle("toggle-x");
		containerBurgerRotate.classList.toggle("toggle-color");
	};
	if(newWidth <= 768){
		containerBurgerRotate.classList.remove("burger-rotate");
		containerBurgerRotate.classList.remove("toggle-x");
		containerBurgerRotate.classList.remove("toggle-color");
	};
});


// links to document
const labelInputWristCircum = document.querySelector("#label-input-wrist-circum");
const labelHeightFrameSize = document.querySelector("#label-height-frame-size");
const inputWristCircum = document.querySelector("#input-wrist-circum");
const inputHeightFrameSize = document.querySelector("#input-height-frame-size");
const cbFrameUs = document.querySelector("#cb-frame-us");
const cbFrameMetric = document.querySelector("#cb-frame-metric");
const cbFrameSizeMale = document.querySelector("#cb-frame-size-male");
const cbFrameSizeFemale = document.querySelector("#cb-frame-size-female");
const btnCalcBodyFrame = document.querySelector("#btn-calc-body-frame");
const displayBodyFrame = document.querySelector("#display-body-frame");


// variables global
let varWristCircum = 0;
let varHeight = 0;
let varFrameSize = "";
let varUsMetricUnit =""
const varMaxMaleHeight = 76;
const varMinMaleHeight = 62;
const varMaxFemaleHeight = 72;
const varMinFemaleHeight = 58;


// only one checkbox jquery
// checkboxes frame us metric
$('input.cb-frame-us-metric').on('change', function() {
    $('input.cb-frame-us-metric').not(this).prop('checked', false);  
});
// checkboxes frame size male female
$('input.cb-frame-size-male-female').on('change', function() {
    $('input.cb-frame-size-male-female').not(this).prop('checked', false);  
});


//change label from US/Metric
cbFrameUs.addEventListener("change", function(){
	if (cbFrameUs.checked){
	labelInputWristCircum.innerHTML = "Wrist Circumference (inches):";
	labelHeightFrameSize.innerHTML = "Height (inches):";
	};
});
cbFrameMetric.addEventListener("change", function(){
	if (cbFrameMetric.checked){
		labelInputWristCircum.innerHTML = "Wrist Circumference (cm):";
		labelHeightFrameSize.innerHTML = "Height (meters):";
	};
});


// button calculate body frame
btnCalcBodyFrame.addEventListener("click", function(){
	//check if everything is entered properly
	if((cbFrameUs.checked || cbFrameMetric.checked) && inputWristCircum.value !== "" && inputHeightFrameSize.value !== "" && (cbFrameSizeMale.checked || cbFrameSizeFemale.checked)){
		calcBodyFrame();
	}
	else{
		displayBodyFrame.innerHTML = "<strong>Please Fill in all fields.</strong>";
	};
});


// functoin for calculating frame size and getting ideal body weight range
function calcBodyFrame(){
	// convert to US measurement
	if(cbFrameMetric.checked){
		let w = inputWristCircum.value;
		let h = inputHeightFrameSize.value;
		varWristCircum = w / 2.54;
		varHeight = Math.floor(h / 0.0254);
		varUsMetricUnit = "kgs"
	}
	else{
		varWristCircum = inputWristCircum.value;
		varHeight = Math.floor(inputHeightFrameSize.value);
		varUsMetricUnit = "lbs"
	};
	
	
	// get frame size
	// find height in array
	if (cbFrameSizeMale.checked){
		// use wrist circumfence to get frame size data from array 
		varFrameSize = frameSizeMale(varWristCircum);
		// check male wrist size
		// check range of male height
		// loop through array to find weight data
		if(varWristCircum < 5.5){
			displayBodyFrame.innerHTML = `<p>${varFrameSize} </p>`;
		} 
		else if(varHeight < varMinMaleHeight || varHeight > varMaxMaleHeight){
			displayBodyFrame.innerHTML = `<p>Please enter a height between 62-76 inches (157.48-193.04 cm) for Males. </p>`;
		}	
		else{
			for(let i = 0; i < arrayWeightChartMale.length; i++){
				if(arrayWeightChartMale[i].height === varHeight){
				let key = varFrameSize;
				// output data
				displayBodyFrame.innerHTML = `<p>You have a <b>${varFrameSize}</b> frame size.*</p><p>The Ideal body weight for you is <b>${arrayWeightChartMale[i][key]}</b> ${varUsMetricUnit}.**</p>`;
				};
			};
		};
	};

	if (cbFrameSizeFemale.checked){
		// use wrist circumfence to get frame size data from array 
		varFrameSize = frameSizeFemale(varWristCircum);
		// check range of female height
		// loop through array to find weight data
		if(varHeight < varMinFemaleHeight || varHeight > varMaxFemaleHeight){
			displayBodyFrame.innerHTML = `<p>Please enter a height between 58-72 inches (147.32-182.88.04 cm) for Females. </p>`;
		}	
		else{
			for(let i = 0; i < arrayWeightChartFemale.length; i++){
				if(arrayWeightChartFemale[i].height === varHeight){
				let key = varFrameSize;
				// output data
				displayBodyFrame.innerHTML = `<p>You have a <b>${varFrameSize}</b> frame size.*</p><p>The Ideal body weight for you is <b>${arrayWeightChartFemale[i][key]}</b> ${varUsMetricUnit}.**</p>`;
				};
			};
		};
	};
}


// get male wrist size
function frameSizeMale(x){
	if (x < 5.5){
		return "Your wrist circumfence is less than 5.5 inches (13.97cm) use Female."
	}
	if(x >= 5.5 && x < 6.5){
		return "small";
	}
	else if(x >= 6.5 && x <= 7.5){
		return "medium";
	}
	else if(x > 7.5){
		return "large";
	};
}
// get female wrist size 
function frameSizeFemale(x){
	if(varHeight <= 62){
		if(x <= 5.5){
			return "small";
		}
		else if(x > 5.5 && x < 5.75){
			return "medium";
		}
		else if(x >= 5.75){
			return "large";
		};
	}
	else if(varHeight > 62 && varHeight < 65){
		if(x <= 6){
			return "small";
		}
		else if(x > 6 && x < 6.25){
			return "medium";
		}
		else if(x >= 6.25){
			return "large";
		};
	}
	else if(varHeight >= 65){
		if(x <= 6.25){
			return "small";
		}
		else if(x > 6.25 && x < 6.5){
			return "medium";
		}
		else if(x >= 6.5){
			return "large";
		};
	};
}


// button reset Frame size fields
const btnResetFrameSize = document.querySelector("#btn-reset-frame-size");
btnResetFrameSize.addEventListener("click", function(){
	cbFrameUs.checked = false;
	cbFrameMetric.checked = false;
	cbFrameSizeMale.checked = false;
	cbFrameSizeFemale.checked = false;
	labelInputWristCircum.innerHTML = "Wrist Circumference:";
	labelHeightFrameSize.innerHTML = "Height:";
	displayBodyFrame.innerHTML = "Please enter data into fields.";
	inputWristCircum.value = "";
	inputHeightFrameSize.value = "";
})


// Array for female body weight by height
const arrayWeightChartFemale = [
	{
	"height": 58, 	
	"small": "102-111",
	"medium": "109-121",
	"large": "118-131",
	},
	{
	"height": 59, 	
	"small": "103-113",
	"medium": "111-123",
	"large": "120-134",
	},
	{
	"height": 60, 	
	"small": "104-115",
	"medium": "113-126",
	"large": "122-137",
	},
	{
	"height": 61, 	
	"small": "106-118",
	"medium": "115-129",
	"large": "125-140",
	},
	{
	"height": 62, 	
	"small": "108-121",
	"medium": "118-132",
	"large": "128-143",
	},
	{
	"height": 63, 	
	"small": "111-124	",
	"medium": "121-135",
	"large": "131-147",
	},
	{
	"height": 64, 	
	"small": "114-127",
	"medium": "124-138",
	"large": "134-151",
	},
	{
	"height": 65, 	
	"small": "117-130",
	"medium": "127-141",
	"large": "137-155",
	},
	{
	"height": 66, 	
	"small": "120-133",
	"medium": "130-144",
	"large": "140-159",
	},
	{
	"height": 67, 	
	"small": "123-136",
	"medium": "133-147",
	"large": "143-163",
	},
	{
	"height": 68, 	
	"small": "126-139",
	"medium": "136-150",
	"large": "146-167",
	},
	{
	"height": 69, 	
	"small": "129-142",
	"medium": "139-153",
	"large": "149-170",
	},
	{
	"height": 70, 	
	"small": "132-145",
	"medium": "142-156",
	"large": "152-173",
	},
	{
	"height": 71, 	
	"small": "135-148",
	"medium": "145-159",
	"large": "155-176",
	},
	{
	"height": 72, 	
	"small": "138-151",
	"medium": "148-162",
	"large": "158-179",
	},
];


// Array for male body weight by height
const arrayWeightChartMale = [
	{
	"height": 62, 	
	"small": "128-134",
	"medium": "131-141",
	"large": "138-150",
	},
	{
	"height": 63, 	
	"small": "130-136",
	"medium": "133-143",
	"large": "140-153",
	},
	{
	"height": 64, 	
	"small": "132-138",
	"medium": "135-145",
	"large": "142-156",
	},
	{
	"height": 65, 	
	"small": "134-140",
	"medium": "137-148",
	"large": "144-160",
	},
	{
	"height": 66, 	
	"small": "136-142",
	"medium": "139-151",
	"large": "146-164",
	},
	{
	"height": 67, 	
	"small": "138-145",
	"medium": "142-154",
	"large": "149-168",
	},
	{
	"height": 68, 	
	"small": "140-148",
	"medium": "145-157",
	"large": "152-172",
	},
	{
	"height": 69, 	
	"small": "142-151",
	"medium": "148-160",
	"large": "155-176",
	},
	{
	"height": 70, 	
	"small": "144-154",
	"medium": "151-163",
	"large": "158-180",
	},
	{
	"height": 71, 	
	"small": "146-157",
	"medium": "154-166",
	"large": "161-184",
	},
	{
	"height": 72, 	
	"small": "149-160",
	"medium": "157-170",
	"large": "164-188",
	},
	{
	"height": 73, 	
	"small": "152-164",
	"medium": "160-174",
	"large": "168-192",
	},
	{
	"height": 74, 	
	"small": "155-168",
	"medium": "164-178",
	"large": "172-197",
	},
	{
	"height": 75, 	
	"small": "158-172",
	"medium": "167-182",
	"large": "176-202",
	},
	{
	"height": 76, 	
	"small": "162-176",
	"medium": "171-187",
	"large": "181-207",
	},		
];


// Copyright date
const copyrightDate = document.querySelector("#footer-copyright-date");
copyrightDate.innerHTML = `2022 - ${new Date().getFullYear()}`;


