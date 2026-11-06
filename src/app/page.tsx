import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Trang chủ</p>
        <h1>Khám phá truyện</h1>
        <p className={styles.lead}>
          Nova Wave Hub là nơi độc giả Việt Nam tìm thấy truyện mới, theo dõi
          tác phẩm yêu thích và tiếp tục hành trình đọc.
        </p>
      </div>

      <section aria-labelledby="home-note-title" className={styles.note}>
        <h2 id="home-note-title">Khung giao diện đã sẵn sàng</h2>
        <p>
          E01-02 đã thiết lập design tokens, typography, spacing và application
          shell responsive. Nội dung catalog, tìm kiếm và thư viện sẽ được bổ
          sung ở các epic tiếp theo.
        </p>
      </section>
    </>
  );
}
