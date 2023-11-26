import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

function List({ employees, handleEdit, handleDelete }) {
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items to display per page
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Filter the data whenever search term changes
        const filteredEmployees = employees.filter(
            (employee) =>
                employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.Experience.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.DOB.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filteredEmployees);
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm, employees]);

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages based on filtered data and items per page
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const arrow = (key) => {
        if (sortBy === key) {
            return sortOrder === 'asc' ? '↑' : '↓';
        }
        return null;
    };
    return (
        <div className='contain-table'>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', padding: '6px' }}
            />
            <table className='striped-table'>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('no')}>
                            NO {arrow('no')}
                        </th>
                        <th onClick={() => handleSort('username')}>
                            USERNAME {arrow('username')}
                        </th>
                        <th onClick={() => handleSort('email')}>
                            EMAIL {arrow('email')}
                        </th>
                        <th onClick={() => handleSort('Experience')}>
                            Experience {arrow('Experience')}
                        </th>
                        <th onClick={() => handleSort('description')}>
                            DESCRIPTION {arrow('description')}
                        </th>
                        <th onClick={() => handleSort('DOB')}>
                            DATE {arrow('DOB')}
                        </th>
                        <th colSpan={2} className="text-center">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((employee, i) => (
                            <tr key={employee.id}>
                                <td>{i + 1}</td>
                                <td><Link to={`/api/users/${employee._id}`}>{employee.username}</Link></td>
                                <td>{employee.email}</td>
                                <td>{employee.Experience}</td>
                                <td>{employee.description}</td>
                                <td>{employee.DOB} </td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleEdit(employee._id)}
                                        className="button muted-button"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="text-left">
                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                        className="button muted-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8}>No Users</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div style={{ marginTop: '20px' }}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => paginate(page)}
                    style={{
                        marginRight: '5px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        color: '#333',
                        padding: '5px 10px',
                        cursor: 'pointer',
                    }}
                >
                    {page}
                </button>
            ))}
        </div>
        </div>
    );
}

export default List;
