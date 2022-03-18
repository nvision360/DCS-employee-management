import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { EmployeeData } from './FetchEmployee';

interface AddEmployeeDataState {
    title: string;
    loading: boolean;
    empData: EmployeeData;
}

export class AddEmployee extends React.Component<RouteComponentProps<{}>, AddEmployeeDataState> {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, empData: new EmployeeData };

        var empid = this.props.match.params["empid"];

        if (empid > 0) {
            fetch('api/Employee/Details/' + empid)
                .then(response => response.json() as Promise<EmployeeData>)
                .then(data => {
                    this.setState({ title: "Edit Employee", loading: false, empData: data });
                });
        }

        else {
            this.state = { title: "Add Employee", loading: false, cityList: [], empData: new EmployeeData };
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.cityList);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Employee Details</h3>
            <hr />
            {contents}
        </div>;
    }

    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit employee.
        if (this.state.empData.employeeId) {
            fetch('api/Employee/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }

        else {
            fetch('api/Employee/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }
    }

    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchemployee");
    }

    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">First Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.firstName} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Last Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.lastName} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Email</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.email} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Address</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.address} required />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Mobile</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.mobile} required />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}