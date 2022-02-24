# Dự án kết thúc học phần môn Phát triển ứng dụng Web - INT3306 1

Citizen là ứng dụng web được phát triển nhằm phục vụ công tác điều tra dân số trên toàn quốc. Khi được áp dụng, hệ thống sẽ giúp việc khai báo, nhập liệu, tổng hợp và phân tích dữ liệu về dân số một cách thuận tiện.  

---
Danh sách thành viên nhóm
1. Nguyễn Hải Sơn - 19020424 - Phụ trách Backend + database
2. Triệu Minh Tiến - 1902169 - Phụ trách báo cáo + kiểm thử
3. Nguyễn Xuân Trang - 19020464 - Phụ trách Frontend


Mô tả nghiệp vụ

 

CitizenV là ứng dụng web được phát triển nhằm phục vụ công tác điều tra dân số trên toàn quốc. Khi được áp dụng, hệ thống sẽ giúp việc khai báo, nhập liệu, tổng hợp và phân tích dữ liệu về dân số một cách thuận tiện. Hệ thống phục vụ các vai trò/đối tượng sử dụng sau:

-          A1. Tổng cục Dân số thuộc Bộ Y tế

-          A2. Chi cục dân số thuộc Sở Y tế các tỉnh/thành phố

-          A3. Công chức thực hiện công tác dân số tại Phòng Y tế các huyện/quận

-          B1. Viên chức dân số thuộc Trạm Y tế xã/phường.

-          B2. Cộng tác viên dân số tại các thôn, bản, tổ dân phố.

Chức năng cụ thể cho từng vai trò sử dụng như sau:

A1

Một hoặc nhiều tài khoản cán bộ A1 được thiết lập trước hoặc được cấp bởi admin. Cán bộ A1 thực hiện các chức năng sau:
- Khai báo và cấp mã cho 63 tỉnh/thành phố. Mỗi mã tỉnh/thành phố bao gồm hai (02) chữ số. Các mã cấp cho các tỉnh/thành lần lượt từ 01 đến 63.
- Cấp tài khoản cho cán bộ A2. Mỗi chi cục được cấp một tài khoản duy nhất, tên tài khoản trùng với tên mã tỉnh/thành phố.
- Cấp và mở quyền khai báo (thời điểm bắt đầu và kết thúc khai báo dân số) cho các A2. Nếu một A2 đã bị khóa quyền khai báo thì tất cả các cán bộ cấp dưới của A2 cũng không được quyền khai báo. Quyền khai báo là quyền thay đổi (thêm, sửa, xóa) dữ liệu.
- Theo dõi tình hình/tiến độ điều tra và nhập liệu của các tỉnh/thành phố.
- Xem tổng hợp và phân tích số liệu dân số trên toàn quốc, của từng tỉnh/thành hoặc nhóm tỉnh/thành phố, của từng huyện/quận hoặc nhóm huyện/quận, của từng xã/phường hoặc nhóm xã/phường.
- Xem danh sách dân số trên toàn quốc, của từng tỉnh/thành hoặc nhóm tỉnh/thành phố, của từng huyện/quận hoặc nhóm huyện/quận, của từng xã/phường hoặc nhóm xã/phường.
- Xem thông tin về một người dân bất kỳ trên toàn quốc.

A2

Cán bộ A2 có chức năng tương tự A1 nhưng chỉ trong phạm vi một tỉnh/thành phố. Cán bộ A2 của tỉnh/thành phố nào thì chỉ được quyền trên dữ liệu dân số và người dùng của tỉnh/thành phố đó. Cụ thể, cán bộ A2 thực hiện các chức năng sau:
- Khai báo và cấp mã cho các huyện/quận trực thuộc tỉnh/thành phố. Mỗi mã huyện/quận bao gồm bốn (04) chữ số, trong đó hai (02) chữ số đầu là mã tỉnh/thành phố, hai (02) chữ số cuối là số thứ tự của huyện/quận trong tỉnh/thành phố.
- Cấp tài khoản cho cán bộ A3. Mỗi huyện/quận được cấp một tài khoản duy nhất, tên tài khoản trùng với tên mã huyện/quận.
- Cấp và mở quyền khai báo (thời điểm bắt đầu và kết thúc khai báo dân số) cho các A3. Nếu một A3 đã bị khóa quyền khai báo thì tất cả các cán bộ cấp dưới của A3 cũng không được quyền khai báo. Quyền khai báo là quyền thay đổi (thêm, sửa, xóa) dữ liệu.
- Theo dõi tình hình/tiến độ điều tra và nhập liệu của các huyện/quận.
- Xem tổng hợp và phân tích số liệu dân số trên toàn tỉnh/thành phố, của từng huyện/quận hoặc nhóm huyện/quận, của từng xã/phường hoặc nhóm xã/phường.
- Xem danh sách dân số trên toàn tỉnh/thành phố, của từng huyện/quận hoặc nhóm huyện/quận, của từng xã/phường hoặc nhóm xã/phường.
- Xem thông tin về một người dân bất kỳ trên toàn tỉnh/thành phố.

A3

Cán bộ A3 có chức năng tương tự A1, A2 nhưng chỉ trong phạm vi một huyện/quận. Cán bộ A3 của huyện/quận nào thì chỉ được quyền trên dữ liệu dân số và người dùng của huyện/quận đó. Cụ thể, cán bộ A3 thực hiện các chức năng sau:
- Khai báo và cấp mã cho các xã/phường trực thuộc huyện/quận. Mã của xã phường gồm sáu (06) chữ số, trong đó bốn (04) chữ số đầu là mã huyện/quận cấp trên, hai (02) chữ số cuối là số thứ tự của xã/phường.
- Cấp tài khoản cho cán bộ B1. Mỗi xã/phường được cấp một tài khoản B1 duy nhất, tên tài khoản trùng với tên mã xã/phường.
- Cấp và mở quyền khai báo (thời điểm bắt đầu và kết thúc khai báo dân số) cho các B1. Nếu một B1 đã bị khóa quyền khai báo thì tất cả các cán bộ cấp dưới của B1 cũng không được quyền khai báo. Quyền khai báo là quyền thay đổi (thêm, sửa, xóa) dữ liệu.
- Theo dõi tình hình/tiến độ điều tra và nhập liệu của các xã/phường.
- Xem tổng hợp và phân tích số liệu dân số trên toàn huyện/quận, của từng xã/phường hoặc nhóm xã/phường.
- Xem danh sách dân số trên toàn huyện/quận, của từng xã/phường hoặc nhóm xã/phường.
- Xem thông tin về một người dân bất kỳ trên toàn huyện/quận.

B1

Các cấp A1-A2-A3 chỉ đạo và theo dõi tình hình thực hiện điều tra và nhập liệu. Ngược lại, các cấp B1 và B2 mới trực tiếp thực hiện điều tra và nhập liệu về dân số trên địa bàn từng xã/phường. Mỗi cán bộ B1 chịu trách nhiệm về dữ liệu dân số trên địa bàn xã/phường của mình. Cụ thể, cán bộ B1 thực hiện các chức năng sau:
- Khai báo và cấp mã cho các thôn/bản/tổ dân phố trực thuộc xã/phường. Mã của thôn/bản/tổ dân phố gồm tám (08) chữ số, trong đó sáu (06) chữ số đầu là mã xã/phường cấp trên, hai (02) chữ số cuối là số thứ tự của thôn/bản/tổ dân phố.
- Cấp tài khoản cho cán bộ B2. Mỗi thôn/bản/tổ dân phố được cấp một tài khoản B2 duy nhất, tên tài khoản trùng với tên mã thôn/bản/tổ dân phố.
- Cấp và mở quyền khai báo (thời điểm bắt đầu và kết thúc khai báo dân số) cho các B2. Quyền khai báo là quyền thay đổi (thêm, sửa, xóa) dữ liệu.
- Trực tiếp nhập dữ liệu dân số của xã/phường mình hoặc yêu cầu các B2 nhập liệu và B1 chỉ cần rà soát lại. B1 trực tiếp chịu trách nhiệm về dữ liệu dân số trên địa bàn xã/phường của mình. Các B2 chỉ có vai trò giúp việc cho B1.
- In phiếu điều tra dân số để phát cho các B2
- Theo dõi tình hình/tiến độ điều tra và nhập liệu của các thôn/bản/tổ dân phố.
- Xem tổng hợp và phân tích số liệu dân số trên toàn xã/phường, của từng thôn/bản/tổ dân phố.
- Xem danh sách dân số trên toàn xã/phường, của từng thôn/bản/tổ dân phố hoặc nhóm thôn/bản/tổ dân phố.
- Xem thông tin về một người dân bất kỳ trên toàn xã/phường.
- Báo cáo hoàn thành (kích hoạt trạng thái đã hoàn thành) việc điều tra và nhập dữ liệu và dân số thuộc xã/phường của mình.

B2

- Phát phiếu điều tra dân số đến từng hộ dân thuộc thôn/bản/tổ dân phố và thu phiếu điều tra sau khi các các hộ khai báo xong.
- Nhập liệu về dân số thuộc các phiếu đã khảo sát hoặc nộp phiếu cho B1 để B1 nhập.
 

 


Thông tin về dân số

Thông tin về mỗi người dân chỉ là những thông tin cơ bản về nhân thân, bao gồm:
- Số CCCD/CMND (với người đã được cấp)
- Họ và tên
- Ngày sinh
- Giới tính
- Quê quán
- Địa chỉ thường trú
- Địa chỉ tạm trú
- Tôn giáo
- Trình độ văn hóa
- Nghề nghiệp
