$(document).ready( function (){


    var topics= ["Pizza", "Hot dogs", "Fried Chicken" ];
    var parseTopics = JSON.parse(localStorage.getItem('topics'));

    if(parseTopics === null){
        displayButtons(topics)
    }else{
        displayButtons(parseTopics)
    }
   

    $(document).on('click', ".submit", function (){
        var userInput= $(".addTopics").val(); 
        console.log(userInput);
        topics.push(userInput); 
        console.log(topics); 
        if(parseTopics === null){
            var stringTopics= JSON.stringify(topics)
            console.log(stringTopics);  
            localStorage.setItem( 'topics', stringTopics ); 
            parseTopics= JSON.parse(localStorage.getItem('topics'))
            displayButtons(parseTopics); 
        }else{

            parseTopics= JSON.parse(localStorage.getItem('topics'))
            topics = parseTopics;
            topics.push(userInput); 
            var stringTopics= JSON.stringify(topics)
            localStorage.setItem( 'topics', stringTopics ); 
            displayButtons(topics);  
        }
        
    }  )

    function displayButtons(topicButtons) {
        $('.topicButtons').empty(); 
        for (var i= 0; i<topicButtons.length; i++ ) {
            var btn= $("<button class='topic'  type='button'> "); 
             btn.text(topicButtons[i]); 
             btn.attr('data-value', topicButtons[i] )
             $(".topicButtons").append(btn);
        }
    }
    $(document).on('click', ".topic", function (){
        $('.giphys').empty (); 
     var Query =$(this).attr("data-value")
     console.log(Query); 


     $.ajax({
         url: "http://api.giphy.com/v1/gifs/search?api_key=bRDlxqe0faZn5aXE3dvtQmcF58c2i7Eo&q="+Query,
         method: "GET"  

        })
    .then(function (response ){
        console.log(response); 
        //Go to each object, grab the link for Giphy and then we want to display the image in the dom. 
        for (var i=0; i<response.data.length; i++ ){
            var imageLink = response.data[i].images.fixed_height.url
            console.log(imageLink); 
            $('.giphys').append("<img src= " + imageLink + ">")   

             }
        } )  
    })
    } ) 