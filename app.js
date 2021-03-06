const List = class {
	constructor() {
		// doms
		this.$form = $('#itemForm');
		this.$input = $('#item');
		this.$container = $('.list');
		this.items = [];
		this.init();
	}

	init() {
		// load items
		// add event handlers
		fetch('/getitems')
			.then(response => response.json())
			.then(data => {
				this.items = data.items;
				this.show();
			})
			.catch(err => console.log(err));

			$('#itemForm').on('submit', (e)=>{ this.add(e)} )
	}

	show() {
		this.items.forEach(item => {
			$('.list').append(`<p>${item}</p>`);
		});
	}

	add(e) {
		e.preventDefault();
		const newItem = $('#item').val();
		this.append(newItem);
		this.save(newItem);
		// get text from input and create item
	}

	append(item) {
		console.log(this.items, item);
		this.items.push(item);
		$('.list').append(`<p>${item}</p>`);
	}

	save(item) {
		fetch('/setitem', {
			method: 'post',
			body: JSON.stringify({"newitem": item}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {})
			.catch(err => console.log(err));
	}
};

new List();

// let deleteBtn = document.getElementsByClassName("delete");

// for (let delete of deleteBtn) {
//     let btn = document.createElement("button"); // create a btn
//     btn.className = "remove-button";
//     btn.innerHTML = "[x]";
    
//     deleteBtn.style.position = "relative";               
//     btn.style.position = "absolute";           
//     btn.style.top = "0";
    
//     btn.onclick = () => deleteBtn.remove();          
    
// 	deleteBtn.append(btn);                           
// }
