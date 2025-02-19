import Image from "next/image";
import styles from '../styles/categoryTable.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const CategoryTable = ({ categories, loading, errorMessage, onEdit, onDelete}) => (
    <table className={styles.product_table}>
        <thead>
            <tr>
                <th><input type="checkbox" /></th>
                <th>ICON</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            {loading && <tr><td>Loading...</td></tr>}
            {errorMessage && <tr><td>{errorMessage}</td></tr>}
            {categories.length > 0 ? (
                categories.map((category) => (
                    <tr key={category.id}>
                        <td><input type="checkbox" /></td>
                        <td>
                            <Image
                                src={`http://localhost:5000/uploads/${category.image}`}
                                alt={category.name}
                                width={50}
                                height={50}
                                style={{ height: 'auto', width: 'auto' }}
                            />
                        </td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                            <FontAwesomeIcon
                                icon={faEdit}
                                className={styles.btn_edit}
                                onClick={() => onEdit(category.id)}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                className={styles.btn_delete}
                                onClick={() => onDelete(category.id)}
                            />
                        </td>
                    </tr>
                ))
            ) : (
                <tr><td>No Categories Available</td></tr>
            )}
        </tbody>
    </table>
);

export default CategoryTable;