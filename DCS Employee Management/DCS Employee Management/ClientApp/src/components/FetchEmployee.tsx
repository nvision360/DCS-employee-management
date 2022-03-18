import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchEmployeeDataState {
    empList: EmployeeData[];
    loading: boolean;
}

export class FetchEmployee extends React.Component<RouteComponentProps<{}>, FetchEmployeeDataState> {
    constructor() {
        super();
        this.state = { empList: [], loading: true };

        fetch('api/Employee/Index')
            .then(response => response.json() as Promise<EmployeeData[]>)
            .then(data => {
                this.setState({ empList: data, loading: false });
            });

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeeTable(this.state.empList);

        return <div>
            <h1>Employee List</h1>
            <p>
                <Link to="/addemployee">Add employee</Link>
            </p>
            {contents}
        </div>;
    }

    private handleDelete(id: number) {
        if (!confirm("Do you want to delete employee with Id: " + id))
            return;
        else {
            fetch('api/Employee/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        empList: this.state.empList.filter((rec) => {
                            return (rec.employeeId != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/employee/edit/" + id);
    }

    private renderEmployeeTable(empList: EmployeeData[]) {
        return <table className='table'>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.employeeId}>
                        <td>
                            <h4>{emp.firstName} {emp.lastName}</h4>
                            <p>{emp.address}</p>
                            <p>{emp.mobile}</p>
                            <p>{emp.email}</p>
                        </td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.employeeId)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(emp.employeeId)}>Remove</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class EmployeeData {
    employeeId: number = 0;
    firstName: string = "";
    lastName: string = "";
    address: string = "";
    email: string = "";
    mobile: string = "";
} 