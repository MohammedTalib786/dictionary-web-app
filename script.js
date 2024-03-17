// Chain of getting things from this api
/*
console.log(res[0])
console.log(res[0].word)
console.log(res[0].meanings[0])
console.log(res[0].meanings[0].definitions[0])
console.log(res[0].meanings[0].definitions[0].definition)
console.log(res[0].meanings[0].definitions[0].example)
*/

$(document).ready(function () {
    // console.log($)
    $('#btn').click(async function (e) {
        e.preventDefault();
        // let url = `https://api.dictionaryapi.dev/api/v2/entries/en/color`;
        // console.log(inp.val())
        try {
            let inp = $('#inp');
            let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inp.val()}`;
            let data = await fetch(url);
            let res = await data.json();
            if (inp.val() == '') {
                alert('fill textbox')
            }
            else {
                inp.val('');
                if (res.title == 'No Definitions Found') {
                    // console.log(res)
                    // console.log(res.message)
                    let iHtml = `
                        <div class="card py-3  noun">
                        <div class="card-header " style="font-style: italic;">${res.title}</div>
                            <div class="card-body">
                                <blockquote class="blockquote mb-0">
                                    <p>${res.message}</p>
                                    <div id="forClickBtn1" class="forClickBtn">${res.resolution}</div>
                                </blockquote>
                            </div>
                        </div>
                    `;
                    $('#cont').html(iHtml)
                }
                else {
                    // console.log(res)
                    let iHtml = `
                            <div class="main-word d-flex align-items-center  my-4 ">
                                <button id="main-sound-btn" class="main-sound-btn"><i class="fa-solid fa-volume-high"></i></button>
                                <h2>${res[0].word}</h2>
                            </div>
        
                            <div class="card my-3  noun">
                                <div class="card-header " style="font-style: italic;">noun</div>
                                <div class="card-body">
                                    <blockquote class="blockquote mb-0">
                                        <p>${res[0].meanings[0].definitions[0].definition}</p>
                                        <div id="forClickBtn1" class="forClickBtn">${res[0].meanings[0].definitions[0].example == undefined ? 'Sorry! Example is not Available' : res[0].meanings[0].definitions[0].example}&nbsp;&nbsp;<i class="fa-solid fa-volume-high"></i></div>
                                    </blockquote>
                                </div>
                            </div>
        
                            <div class="card my-3 verb">
                                <div class="card-header " style="font-style: italic;">verb</div>
                                <div class="card-body">
                                    <blockquote class="blockquote mb-0">
                                        <p>${res[0].meanings[1].definitions[0].definition}</p>
                                        <div id="forClickBtn2" class="forClickBtn">${res[0].meanings[1].definitions[0].example == undefined ? 'Sorry! Example is not Available' : res[0].meanings[1].definitions[0].example}&nbsp;&nbsp;<i class="fa-solid fa-volume-high"></i></div>
                                    </blockquote>
                                </div>
                            </div>
                    
                            <div class="read-more">
                                <a href="${res[0].sourceUrls[0]}" target="_blank" class="read-more-btn d-flex justify-content-center align-items-center text-white text-decoration-none " >Read More...</a>
                            </div>
                    `;

                    $('#cont').html(iHtml)

                    // console.log('elem', $('#main-sound-btn'))
                    $('#main-sound-btn').click(function () {
                        let speech = new SpeechSynthesisUtterance(res[0].word);
                        window.speechSynthesis.speak(speech)
                    })

                    $('#forClickBtn1').click(function () {
                        let speech = new SpeechSynthesisUtterance(res[0].meanings[0].definitions[0].example == undefined ? 'Sorry! Example is not Available' : res[0].meanings[0].definitions[0].example);
                        window.speechSynthesis.speak(speech)
                    })

                    $('#forClickBtn2').click(function () {
                        let speech = new SpeechSynthesisUtterance(res[0].meanings[1].definitions[0].example == undefined ? 'Sorry! Example is not Available' : res[0].meanings[1].definitions[0].example);
                        window.speechSynthesis.speak(speech)
                    })
                }
            }
        }

        catch (e) {
            console.log(e.message);
            let iHtml = `
                <div class="card py-3 noun">
                <div class="card-header " style="font-style: italic;">No Definitions Found</div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                        <p>Sorry pal, we couldn't find definitions for the word you were looking for.</p>
                        <div id="forClickBtn1" class="forClickBtn">You can try the search again at later time or head to the web instead.</div>
                        </blockquote>
                    </div>
                </div>
            `;
            $('#cont').html(iHtml)
        }
    })
})

