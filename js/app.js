var Header = {
    view: function(ctrl , args) {
        return m('h1.title',args.text);
    }
} ;
 
var SearchBar = {
    controller: function(args){
        // using ctrl
        var ctrl = this ;
        ctrl.searchKey = m.prop('');
        ctrl.searchHandler = function(event){
            ctrl.searchKey(event.target.value);
            args.searchHandler(event.target.value);
        };
        /* using factory function: 
        var search = m.prop('');
        function searchHandler(e){ 
            searchKey(e.target.value);
            args.searchHandler(e.target.value);
        }
        return {
            searchKey: searchKey,
            searchHandler: searchHandler
        }
        using `this`
        this.searchKey = m.prop('');
        this.searchHandler = function (e) {
            this.searchKey(e.target.value);
            args.searchHandler(e.traget.value);
        }.bind(this)
        */
    },
	view: function () {
		return m('input[type=search]');
	}
};

var EmployeeListItem = {
    view: function( ctrl , args) {
        return m ('li',[
            m('a',{
                href: '#employees/' + args.employee.id
            },[
                m('span', args.employee.firstName),
                m('span', args.employee.lastName)
            ])
        ])
    }
} ;

var EmployeeList = { 
    view: function(ctrl, args) {
        var items = args.employees.map(function(employee, id){
            return m.component(EmployeeListItem, {
                key: employee.id,
                employee: employee
            });
        })
        return m('ul', items) ;
    }
};

var employees = [{
    firstName:'Leo',
    lastName: 'Horie'
},
{
    firstName:'Barney',
    lastName: 'Carrol'
},
{
    firstName:'Stphen',
    lastName: 'Hoyer'
}]

var HomePage = { 
    view: function() {
        return m('div',[
            m.component(Header, {text: ' Employee Dictionary'}),
            m.component(SearchBar) ,
            m.component(EmployeeList, 
            {
                employees : employees
            })
        ])
    }
}

m.mount( document.body , HomePage);