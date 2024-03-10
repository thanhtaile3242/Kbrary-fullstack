// Lớp đại diện cho một node trong DSLK
class MyNode {
    data: number; // Dữ liệu của node
    next: MyNode | null; // Con trỏ next: Lưu node kế tiếp (MyNode) hoặc không có node nào (null)

    constructor(data: number, next: MyNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Lớp đại diện cho một danh sách liên kết
class SinglyLinkedList {
    head: MyNode | null; // Con trỏ head: Quản lý node đầu tiên
    tail: MyNode | null; // Con trỏ tail: Quản lý node cuối cùng

    constructor() {
        // Khởi tạo bằng một danh sách rỗng
        this.head = this.tail = null; 
    }

    // In data
    print() {
        console.log("====== List ======")
        let curr = this.head; // Biến dùng để duyệt qua các node
        while (curr != null) { // Trong khi chưa duyệt xong node cuối cùng
            console.log(curr.data)
            curr = curr.next;
        }
    }
    // Tính tổng
    sum() {
        let s = 0;
        let curr = this.head;
        while (curr != null) {
            s += curr.data;
            curr = curr.next;
        }
        return s;
    }

    // Thêm node mới với data cho trước vào đầu DSLK
    addHead(data: number) {
        const newNode = new MyNode(data); // Tạo một node mới có data, next trỏ đến null
        if (this.head == null) { // Nếu danh sách rỗng
            this.head = this.tail = newNode;
        }
        else { // Nếu danh sách đã có node
            newNode.next = this.head; // Next của newNode là node đầu tiền
            this.head = newNode; // Cập nhật con trỏ head
        }
    }

    // Thêm node mới với data cho trước vào cuối DSLK
    addTail(data: number) {
        const newNode = new MyNode(data); // Tạo một node mới có data, next trỏ đến null
        if (this.head == null) { // Nếu danh sách rỗng
            this.head = this.tail = newNode;
        }
        else { // Nếu danh sách đã có node
            if (this.tail != null) {
                this.tail.next = newNode; // Thiết lập next của tail là newNode
                this.tail = newNode; // Cập nhật con trỏ tail
            }
            
        }
    }

    // Thêm node mới với data cho trước vào sau một node bất kỳ (aNode) trong DSLK
    addAfter(data: number, aNode: MyNode) {
        if (aNode != null) {
            if (this.head == null) { // Nếu danh sách rỗng
                this.addHead(data); // Thêm một node mới vào đầu DSLK
            }
            else if (aNode === this.tail) {
                this.addTail(data);
            }
            else { // Nếu danh sách khác rỗng và aNode không phải node cuối
                const newNode = new MyNode(data); // Tạo node mới
                let curr: MyNode | null = this.head;
                while (curr != null && curr != aNode) { // Duyệt để tìm một node trong DSLK giống với aNode
                    curr = curr.next;
                }
                if (curr != null) { // Nếu có tồn tại một node giống với aNode
                    newNode.next = curr.next; // Next của node mới trỏ đến node kế tiếp của curr (cũng chính là aNode)
                    curr.next = newNode; // // Next của curr trỏ đến node mới
                }
            }
        }
    }

    // Xóa node đầu tiên DSLK
    removeHead() {
        if (this.head != null) { // DS không rỗng
            if (this.head == this.tail) { // DS có 1 node
                this.head = this.tail = null;
            }
            else { // DS có từ 2 node trở lên
                this.head = this.head.next; // Cập nhật con trỏ head là node kế tiếp của con trỏ head
            }
        }
    }

    // Xóa node cuối cùng DSLK
    removeTail() {
        if (this.head != null) {
            if (this.head.next == null) { // Có 1 nút
                this.head = this.tail = null; // Cập nhật con trỏ head và tail để DSLK trở thành rỗng
            } 
            else { // Có từ 2 nút trở lên
                let curr = this.head; 
                while (curr.next != null && curr.next.next != null) { // Tìm nút kế cuối
                    curr = curr.next;
                }
                curr.next = null; // Cập nhật để next của nút kế cuối là null => Node cuối bị đứt liên kết => Nút cuối bị xóa
                this.tail = curr; // Cập nhật con trỏ tail
            }
        }
    }

    // Xóa node ở vị trí bất kỳ DSLK (aNode)
    removeNode(aNode: MyNode) {
        if (aNode != null && this.head != null) { // Nếu aNode hợp lệ và danh sách không rỗng
            if (aNode === this.head) { // Nếu node cần xóa là head
                this.removeHead();
            }
            else if (aNode == this.tail) { // Nếu node cần xóa là tail
                this.removeTail();
            }
            else { // Các trường hợp còn lại
                let curr = this.head;
                while (curr.next != null && curr.next != aNode) { // Duyệt để tìm nút kế tiếp giống với aNode
                    curr = curr.next;
                }
                if (curr.next != null) // Nếu tìm thấy nút kế tiếp giống với aNode
                    curr.next = curr.next.next; // next của curr trỏ đến nút kế tiếp của aNode
            }
        }
    }
}

function main() {
    // Test MyNode
    const nodeA = new MyNode(3); // Tạo một node A với data là 3
    console.log("- nodeA: ", nodeA); // In node A ra màn hình
    const nodeB = new MyNode(6); // Tạo một node B với data là 6
    console.log("- nodeB: ", nodeB); // In node B ra màn hình
    nodeA.next = nodeB; // Liên kết node A với node B, nghĩa là cho next của A là node B
    console.log("- nodeA (new): ", nodeA); // In lại node A ra màn hình

    // Test SinglyLinkedList
    const list = new SinglyLinkedList(); // Tạo một list mới
    console.log("- list: ", list); // In list ra màn hình
    
    list.head = nodeA; // Gán head là node A
    list.tail = nodeB; // Gán tail là node B
    console.log("- list (updated): ", list); // In list lại lần nữa

    console.log("- Goi ham print")
    list.print();

    console.log("- Tong: ", list.sum());
    
    list.addHead(9);
    console.log("- Sau khi addHead")
    list.print();
    
    list.addTail(12);
    console.log("- Sau khi addTail")
    list.print();

    list.addAfter(15, list.head);
    console.log("- Sau khi addAfter")
    list.print();
    
    list.removeHead();
    console.log("- Sau khi removeHead")
    list.print();

    list.removeTail();
    console.log("- Sau khi removeTail")
    list.print();

    if (list.head.next != null)
        list.removeNode(list.head.next);
    console.log("- Sau khi removeNode")
    list.print();
}

main();