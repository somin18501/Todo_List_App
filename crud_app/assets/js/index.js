$('#add_user').submit(function(event){
    alert('Data inserted Successfully!')
})

$('#update_user').submit(function(event){
    event.preventDefault() // prevent default behaviour of browser to reload after clicking submit button

    var unindexed_array = $(this).serializeArray() // return serialized array of the data submited by user
    var data = {}

    $.map(unindexed_array,function(n,i){ // (n) return all data from unindexed array and i return index from the unindexed array 
        data[n['name']] = n['value']
    })

    // console.log(unindexed_array)
    console.log(data)

    var request = {
        'url': `http://localhost:3000/api/users/${data.id}`,
        'method': 'PUT',
        'data': data
    }

    $.ajax(request).done(function(response){
        alert('Data Updated Successfully')
    })
})

if(window.location.pathname=='/'){
    $ondelete = $('.table tbody td a.delete')
    $ondelete.click(function(){
        var id = $(this).attr('data-id')

        var request = {
            'url': `http://localhost:3000/api/users/${id}`,
            'method': 'DELETE',
        }

        if(confirm('Do you really want to delete this record')){
            $.ajax(request).done(function(response){
                alert('Data Deleted Successfully')
                location.reload()
            })
        }
    })
}