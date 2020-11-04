https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
$(document).ready(function()
{
    const database = firebase.database();
    const beforeQuery = database.ref('/menu');
    const name = document.getElementById("title");
    const money = document.getElementById("price");
    const img = document.getElementById("image");
    const type = document.getElementById("catergory");
    const addBtn = document.getElementById("addBtn");
    /*********
     NOTIFICATION
    **********/
    const notification = (message) =>
    {
        if(message == 'fillall')
        {
            $('.fillall').fadeIn(1000);
            setTimeout(function(){
                $('.fillall').fadeOut(1000);
            },35);
        }

        if(message == 'inserted')
        {
            $('.inserted').fadeIn(1000);
            setTimeout(function(){
                $('.inserted').fadeOut(1000);
            },35);
        }

        if(message == 'upated')
        {
            $('.upated').fadeIn(1000);
            setTimeout(function(){
                $('.upated').fadeOut(1000);
            },35);
        }
     }


     /*********
     ADDING NEW DISHES
     **********/

        addBtn.addEventListener('click', (e) =>
        {
            e.preventDefault();

            const category = type.value;
            const title = name.value;
            const  price = money.value;
            const image = img.value.slice(12);
            const newid = beforeQuery.push();

                    if(!title || !price || !image)
                    {
                        notification('fillall');
                    }

                    else {

                        newid.set({
                            category : category,
                               title : title,
                               price : price,
                               image : "img/"+image
                            },
                        function(error){
                            if(!error)
                            {
                                notification('inserted');
                                $('[name=title]').val("");
                                $('[name=price]').val("");
                                $('[name=image]').val("");
                            }

                            else
                            {
                                console.log('Not Saved');
                            }
                        });

                    }

        });



         /*********
     SELECTING MENU FROM DATABASE
     **********/
    beforeQuery.on('value', function success(data)
    {
        if(data)
        {
            let primi = '',
            scondi= '',
            contorni='',
            dolci='';
        
            $.each(data.val(),function(key,value)
            {
                let id = key,
              category = value['category'],
                 title = value['title'],
                 price = value['price'],
                 image = value['image'];

                if(category == 'primi')
                {
                primi += `<div class="product-box">
                            <div id=${key}>
                             <img class= "image" src=${image}>
                             <div class="title">${title}</div><hr>
                             <div class="price">${parseFloat(price).toFixed(2)} ৳</div><hr>
                             <div data-id=${key} class="delete">
                                <button id ="delete" class="btn btn-danger">Delete</button>
                             </div>
                             <div data-id=${key} class="update">
                                 <button id ="update" class="btn btn-warning">Update</button>
                             </div>
                             </div>
                        </div>`;
                           
                }
                else if(category == 'scondi')
                {
                    scondi += `<div class="product-box">
                            <div id=${key}>
                             <img class= "image" src=${image}>
                             <div class="title">${title}</div><hr>
                             <div class="price">${parseFloat(price).toFixed(2)} ৳</div><hr>
                             <div data-id=${key} class="delete">
                                <button id ="delete" class="btn btn-danger">Delete</button>
                             </div>
                             <div data-id=${key} class="update">
                                 <button id ="update" class="btn btn-warning">Update</button>
                             </div>
                            </div>
                        </div>`;
                }

                else if(category == 'contorni')
                {
                    contorni += `<div class="product-box">
                            <div id=${key}>
                             <img class= "image" src=${image}>
                             <div class="title">${title}</div><hr>
                             <div class="price">${parseFloat(price).toFixed(2)} ৳</div><hr>
                             <div data-id=${key} class="delete">
                                <button id ="delete" class="btn btn-danger">Delete</button>
                             </div>
                             <div data-id=${key} class="update">
                                 <button id ="update" class="btn btn-warning">Update</button>
                             </div>
                             </div>
                        </div>`;
                }

                else if(category == 'dolci')
                {
                    dolci += `<div class="product-box">
                            <div id=${key}>
                             <img class= "image" src=${image}>
                             <div class="title">${title}</div><hr>
                             <div class="price">${parseFloat(price).toFixed(2)} ৳</div><hr>
                             <div data-id=${key} class="delete">
                                <button id ="delete" class="btn btn-danger">Delete</button>
                             </div>
                             <div data-id=${key} class="update">
                                 <button id ="update" class="btn btn-warning">Update</button>
                             </div>
                             </div>
                        </div>`;
                }else{}
            });
            
            $('.primi').html(primi);
            $('.scondi').html(scondi);
            $('.contorni').html(contorni);
            $('.dolci').html(dolci);
        
     /*********
     DELETE FROM DATABASE
     **********/

     $('.delete').click(function()
       {
            let thekey =$(this).data('id');
            beforeQuery.child(thekey).remove();
        });

     /*********
     UPDATING FROM DATABASE
     **********/   
        $('[name=close-update]').click(function()
        {
            $('.for-update').slideUp("slow");
        });
         
        $('.update').click(function()
        {
            let theekey =$(this).data('id');
             $('.for-update').slideDown();

               /**  let oldtitle = $(`#${theekey} > .title`).txt(),
                oldprice = $(`#${theekey} > .price`).txt(),
                slice = oldprice.indexOf('.');

            oldprice = oldprice.slice(0,slice);

            $('[name = newtitle]').val(oldtitle);
            $('[name = newprice]').val(parseFloat(oldprice).toFixed(2));
            $('[name = id]').val(theekey);
            
            $('[name=submit]').click(function(e){
                e.preventDefault();
                let theid = $('[name=id]).val()
            });
            */
            

        });

        










        }else{console.log('No data found')}

    });

});

 
