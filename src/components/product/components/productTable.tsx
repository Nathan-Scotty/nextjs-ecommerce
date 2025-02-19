import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from '../styles/productTable.module.css'
import Image from "next/image";

export default function ProductTable({ products, loading, errorMessage, onEdit, onDelete, onView, onTogglePublished }) {
    return (
        <table  className={styles.product_table}>
            <thead>
                <tr>
                    <th><input type="checkbox" /></th>
                    <th>ICON</th>
                    <th>NAME</th>
                    <th>DESCRIPTION</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>CATEGORIE</th>
                    <th>VIEWS</th>
                    <th>PUBLISHED</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {loading && <tr><td>Loading...</td></tr>}
                {errorMessage && <tr><td>{errorMessage}</td></tr>}
                {products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.id}>
                            <td><input type="checkbox" /></td>
                            <td>
                                <Image
                                    src={`http://localhost:5000/uploads/${product.image}`}
                                    alt={product.name}
                                    width={50}
                                    height={50}
                                    style={{ height: 'auto', width: 'auto' }}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.category?.name || "No Category"}</td>
                            <td>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className={styles.view_btn}
                                    onClick={() => onView(product.id)}
                                />
                            </td>
                            <td>
                                <label className={styles.switch}>
                                    <input type="checkbox" name="" id="" />
                                    <span className={styles.slider}></span>
                                </label>
                            </td>
                            <td>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className={styles.btn_edit}
                                    onClick={() => onEdit(product.id)}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className={styles.btn_delete}
                                    onClick={() => onDelete(product.id)}
                                />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td>No Products Available</td></tr>
                )}
            </tbody>
        </table>
    )
}