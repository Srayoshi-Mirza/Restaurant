https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
$(document).ready(function()
{
    const database = firebase.database();
    const beforeQuery = database.ref('/menu');
    const beforecartQuery = database.ref('/orders');

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
                             <div class="price">${parseFloat(price).toFixed(2)}৳</div><hr>
                             <div class="add-to-cart" data-id=${key}><img class="cart-icon" src="img/cart.png" alt="cart"></div>
                             </div>
                        </div>`;
                           
                }
                else if(category == 'secondari')
                {
                    scondi += `<div class="product-box">
                            <div id=${key}>
                             <img class= "image" src=${image}>
                             <div class="title">${title}</div><hr>
                             <div class="price">${parseFloat(price).toFixed(2)}৳</div><hr>
                             <div class="add-to-cart" data-id=${key}><img class="cart-icon" src="img/cart.png" alt="cart"></div>
                            </div>
                        </div>`;
                }

                else if(category == 'contorni')
                {
                    contorni += `<div class="product-box">
                            <div id=${key}>
                             <img class= "image" src=${image}>
                             <div class="title">${title}</div><hr>
                             <div class="price">${parseFloat(price).toFixed(2)}৳</div><hr>
                             <div class="add-to-cart" data-id=${key}><img class="cart-icon" src="img/cart.png" alt="cart"></div>
                           
                             </div>
                        </div>`;
                }

                else if(category == 'dolci')
                {
                    dolci += `<div class="product-box">
                            <div id=${key}>
                             <img class= "image" src=${image}>
                             <div class="title">${title}</div><hr>
                             <div class="price">${parseFloat(price).toFixed(2)}৳</div><hr>
                             <div class="add-to-cart" data-id=${key}><img class="cart-icon" src="img/cart.png" alt="cart"></div>
                             
                             </div>
                        </div>`;
                }else{}
            });
            
            $('.primi').html(primi);
            $('.secondi').html(scondi);
            $('.contorni').html(contorni);
            $('.dolci').html(dolci);
        
     /*********
     DELETE FROM DATABASE
     **********/
            $('.add-to-cart').click(function(){

                let thekey = $(this).data('id');
                
                let title = $(`#${thekey} > .title`).text(),
                    price = $(`#${thekey} > .price`).text(),
                    slice = price.indexOf('0');
                    price = price.slice(0,slice);

                    let appenddata = `<tr>
                                        <td class = "carttitle">${title}</td>
                                        <td class = "cartprice">${parseFloat(price).toFixed(2)}৳</td>
                                        <td class = "removeme">X</td>
                                        </tr>`;
                    $('.cart').append(appenddata);
            });


            $('.cart-toggle').click(function(){

                $('.cart-container').slideToggle();
            });



            $(document).on('click', '.removeme',function(){

                $(this).parent().remove();
            });


            $(document).on('click', '.removeme, .cart-icon',function(){
                total();
                let totalrows = $('.cartprice').length,
                  itemcounter = $('.totalitems');
                  itemcounter.fadeOut('slow', function(){
                    $(this).html(totalrows).fadeIn('slow');
                  });
            });


            const total = () =>
            {
                let allcartproducts = $('.cartprice'),
                                total = 0;

                                for(let x=0; x < allcartproducts.length; x++)
                                {
                                    var getprice = $('.cartprice').eq(x).text();
                                    total += parseInt(getprice); 
                                }
                $('.total').text(`Total : ${parseFloat(total).toFixed(2)}৳`);

                if(total>1)
                {
                    $('.send-order').slideDown();
                }
                else
                {
                    $('.send-order').slideUp();
                }

                return total;
            }


        $(document).on('click', '.send-order',function(){  
            
            var ordereditems = [];
            let totalrows = $('.cartprice').length;
            const tableno = $('[name=table]').val();

            for(let x=0; x<totalrows; x++)
            {
                var items =
                {
                    item: $('.carttitle').eq(x).text(),
                    price : $('.cartprice').eq(x).text(),
                }
                ordereditems.push(items);
            }

            let newid = beforecartQuery.push();
        
            newid.set({
                products : ordereditems,
                total : total(),
                table : tableno,
            },
            function(error)
            {
                if(!error)
                {
                    $('removeme').click();
                    $('.cart').append('<tr><td colspan="3">Order Sent Successfully</td></tr>');
                    setTimeout(function(){
                        $('.cart-toggle').click();
                    }, 2500);
                }
            });

           

        });




        }else{console.log('No data found')}

    });

});

 
