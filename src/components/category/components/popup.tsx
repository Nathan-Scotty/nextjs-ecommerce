import styles from '../styles/popup.module.css'
import Image from 'next/image';

const Popup = ({
    isVisible,
    onClose,
    name,
    setName,
    description,
    setDescription,
    handleImageChange,
    handleSubmit,
    previewImage,
    loading
}) => {
    if (!isVisible) return null;

    return (
        <div className={styles.popup}>
            <div className={styles.popup_content}>
                <span className={styles.close_btn} onClick={onClose}>
                    &times;
                </span>
                <h2>Add New Category</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <label htmlFor="categoryName">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="categoryDescription">Description:</label>
                    <textarea
                        id="categoryDescription"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label htmlFor="categoryImage">Category Image:</label>
                    <input 
                        type="file"
                        id="categoryImage"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {previewImage && (
                        <div>
                            <Image src={previewImage} alt="Preview" width={100} height={100} style={{ height: 'auto' }}/>
                        </div>
                    )}
                    <button type="submit" className={styles.submit_button} disabled={loading}>
                        {loading ? "Adding..." : "Add Category"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Popup;