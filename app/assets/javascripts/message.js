$(function(){
  function buildHTML(data){
    var content = data.content ? `${ data.content }` : "";
    var img = data.image ? `<img src= ${ data.image }>` : "";
    var html = `<div class="message" data-id="${ data.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                        ${ data.user_name }
                    </div>
                    <div class="upper-message__date">
                        ${ data.created_at }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ content }
                    </p>
                    <div>
                      ${ img }
                    </div>
                  </div>
                  </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled',false);
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
      $('.form__submit').prop('disabled',false);
    })
  })
});