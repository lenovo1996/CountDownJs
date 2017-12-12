# CountDownJs
* Created by LePhi on 12/11/2017.
* How to use:
* CountDownJs cần Jquery để hoạt động
* những options cần thiết để CountDownJs có thể chạy:
  
<pre><code class="javascript">
var options = {
   element: $('#countDownJs'), // element định sẵn để countDownJs tác động đến
   from: Date.now(), // ngày bắt đầu, định dạng timestamp, hãy chắc chắn from date không lớn hơn to date
   to: new Date('01/01/2018').getTime() // ngày kết thúc, định dạng timestamp, hãy chắc chắn from date không lớn hơn to date
};
</code></pre>
  
  nếu muốn hide Year, Day, Hour, Minute, Second, Milisecond,
  thêm các options dưới đây:
  
<pre><code class="javascript">
    options.year = false;
    options.day = false;
    options.hour = false;
    options.minute = false;
    options.second = false;
    options.milisecond = false;
</code></pre>

 
 
 
  nếu muốn thực thi một function sau khi stop countdown,
  hãy thêm option:
  
<pre><code class="javascript">
  options.stop = function () {
     # code here
     alert('Stop countdown');
  }
</code></pre>
  
  Sau khi khai báo options, hãy call CountDownJs để bắt đầu:
  
<pre><code class="javascript">
  new countDownJs(options).start();
</code></pre>
  
  Hãy contribute để CountDownJs hoạt động tốt hơn
 
  *_Cám ơn vì đã sử dụng CountDownJs!_*
