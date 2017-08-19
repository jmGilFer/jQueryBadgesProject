$(function() {

  $.ajax({
    url: 'https://www.codeschool.com/users/CHaNGeTe.json',
    dataType: 'jsonp',
    success: function(response) {
      // handle response
      const $badges = $("#badges");
      response.courses.completed.map((course) => {
        $badges.append(`<div class='course'>
          <h3>${course.title}</h3>
          <img src="${course.badge}" />
          <a target="_blank" href="${course.url}" class="btn btn-primary">See Course</a>
        </div>`);
      });
    }
  });

});
