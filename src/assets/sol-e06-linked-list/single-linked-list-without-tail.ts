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

    constructor() {
        this.head = null; // Khởi tạo bằng một danh sách rỗng
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

    // Thêm node vào đầu DSLK
    addHead(data: number) {
        const newNode = new MyNode(data); // Tạo một node mới có data, next trỏ đến null
        if (this.head == null) { // Nếu danh sách rỗng
            this.head = newNode;
        }
        else { // Nếu danh sách đã có node
            newNode.next = this.head; // Next của newNode là node đầu tiền
            this.head = newNode; // Cập nhật con trỏ head
        }
    }

    // Cách 2: Không dùng đến tail
    addTail(data: number) {
        const newNode = new MyNode(data); // Tạo một node mới có data, next trỏ đến null
        if (this.head == null) { // Nếu danh sách rỗng
            this.head = newNode;
        }
        else { // Nếu danh sách đã có node
            let curr = this.head;
            while (curr.next) { // Duyệt để tìm node cuối cùng
                curr = curr.next;
            }
            curr.next = newNode; // Liên kết node cuối cùng với node mới
        }
    }

    
    // Cách 2: Nếu DSLK không lưu tail
    addAfter(data: number, aNode: MyNode) {
        if (aNode != null) {
            if (this.head == null) { // Nếu danh sách rỗng
                this.addHead(data); // Thêm một node mới vào đầu DSLK
            }
            else { // Nếu danh sách khác rỗng
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

    // Cách 2: Nếu DSLK không lưu tail
    removeHead() {
        if (this.head != null) { // DS không rỗng
            this.head = this.head.next; // Cập nhật con trỏ head là node kế tiếp của con trỏ head
        }
    }

    // Cách 2: Không dùng tail
    removeTail() {
        if (this.head != null) {
            if (this.head.next == null) { // Có 1 nút
                this.head = null; // Cập nhật con trỏ head để DSLK trở thành rỗng
            } 
            else { // Có từ 2 nút trở lên
                let curr = this.head; 
                while (curr.next != null && curr.next.next != null) { // Tìm nút kế cuối
                    curr = curr.next;
                }
                curr.next = null; // Cập nhật để next của nút kế cuối là null => Node cuối bị đứt liên kết => Nút cuối bị xóa
            }
        }
    }

    // Cách 2: Khi không dùng tail
    removeNode(aNode: MyNode) {
        if (aNode != null && this.head != null) { // Nếu aNode hợp lệ và danh sách không rỗng
            if (aNode === this.head) {
                this.removeHead();
            }
            else {
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
    const nodeA = new MyNode(3);
    console.log("nodeA: ", nodeA);
    const nodeB = new MyNode(6);
    console.log("nodeB: ", nodeB);
    nodeA.next = nodeB;
    console.log("nodeA (new): ", nodeA);

    // Test SinglyLinkedList
    const list = new SinglyLinkedList();
    console.log("list: ", list);
    list.head = nodeA;
    console.log("list (updated): ", list);
    list.print();
    console.log("sum: ", list.sum());
    list.addHead(9);
    list.print();
    list.addTail(12);
    list.print();
    list.addAfter(15, list.head);
    list.print();
    list.removeHead();
    list.print();
    list.removeTail();
    list.print();
    if (list.head.next != null)
        list.removeNode(list.head.next);
    list.print();
}

main();