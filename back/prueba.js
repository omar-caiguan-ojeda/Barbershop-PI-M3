function GoBackButton() {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(-1)}>Go Back</button>
    );
}